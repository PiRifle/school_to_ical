<?php
namespace Pirifle\SchoolToIcal\Provider;

use GuzzleHttp\Client;
use PHPHtmlParser\Dom;
use Pirifle\SchoolToIcal\Calendar;
use Pirifle\SchoolToIcal\Teacher;
use Pirifle\SchoolToIcal\Lesson;
use Pirifle\SchoolToIcal\Classroom;
class HTTPCalendarProvider extends Provider {
    private Client $http;
    private Dom $parser;
    private string $lesson_plan;
    public function __construct(string $lesson_plan_url, string $substitutions_url = null) {
        $this->http = new Client();
        $this->parser = new Dom();
        $this->lesson_plan = $lesson_plan_url;
    }

    public function parse(string $class){
    
        $links = $this->get_classes_links();
        return $this->get_class_timetable($links[$class]);
    }
    
    public function get_classes(){
        $links = $this->get_classes_links();
        return array_keys($links);
    } 

    /** 
     * @throws \GuzzleHttp\Exception\BadResponseException
     * @return array<string, string>
    */
    public function get_classes_links(){
        $req = $this->http->get($this->lesson_plan."lista.html");
        if ($req->getStatusCode() > 299 && $req->getStatusCode() < 200){
            throw new \Exception("Bad Response while fetching lesson_plan");
        }
        $this->parser->loadStr($req->getBody()->getContents());
        
        /** @var \PHPHtmlParser\Dom\Node\HtmlNode[] $classes description */
        $classes = $this->parser->find("ul")[0]->getChildren();

        /** @var array<string, string> $links */
        $links = [];

        foreach($classes as $class){
            try{
                /** @var string $class_name */
                $class_name = $class->getChildren()[0]->text;
                /** @var string $class_url */
                $class_url = $class->getChildren()[0]->href;
                $links[str_split($class_name, 3)[0]] = $class_url;
            }catch(\Error $e){}
        }
        return $links;
    }

    private function get_date_for_target_day_of_week($targetDay) {
        $currentDate = new \DateTime();
        $currentDay = $currentDate->format('N'); // 1 for Monday, 2 for Tuesday, etc.
    
        // Calculate the difference in days between the target day and the current day
        $daysToAdjust = $targetDay - $currentDay + 1;
    
        // Add or subtract the days to get the target date
        $currentDate->modify("$daysToAdjust days");
    
        return $currentDate;
    }

    private function get_datetime_for_day_of_week($targetDay, $targetTime) {
        $date = $this->get_date_for_target_day_of_week($targetDay);
        list($hour, $minute) = explode(":", $targetTime);
        $date->setTime(intval($hour), intval($minute));
        return $date;
    }

    /** 
     * @param string $class_link
    */
    public function fetch_table($class_link){
        $req = $this->http->get($this->lesson_plan."/".$class_link);
        if ($req->getStatusCode() > 299 && $req->getStatusCode() < 200){
            throw new \Exception("Bad Response while fetching lesson_plan");
        }
        $this->parser->loadStr($req->getBody()->getContents());
        
        return $this->parser->find(".tabela")[0];
    }

    /** 
     * @param string $class_link
     * @return Calendar
    */
    public function get_class_timetable($class_link){
        $table = $this->fetch_table($class_link);
        $parsed_table = parseHtmlTable($table);
        array_shift($parsed_table);

        $calendar = [];

        for ( $x = 0; $x < count($parsed_table); $x++ ){
            for ( $y = 0; $y < count($parsed_table[$x])-2; $y++ ){
                $time = str_replace(" ", "", $parsed_table[$x][1]->text);
                try{
                    $parrallel = count($parsed_table[$x][$y+2]->find(".p"));
                    if($parrallel==0){continue;}

                    for($i = 0; $i < $parrallel; $i++){
                        list($from, $to) = explode("-", $time);
                        $fromdate = $this->get_datetime_for_day_of_week($y, $from);
                        $todate = $this->get_datetime_for_day_of_week($y, $to);
                        $lesson_name = $parsed_table[$x][$y+2]->find(".p", $i)->text;
                        if(!is_string($lesson_name)){continue;}
                        $teacher_name = $parsed_table[$x][$y+2]->find(".n", $i)->text;
                        $classroom = $parsed_table[$x][$y+2]->find(".s", $i)->text;
                        
                        
                        $teacher = new Teacher($teacher_name??"");
                        $class = new Classroom($classroom??"");
                        $lesson = new Lesson($lesson_name, $teacher, $class, $fromdate, $todate);
                        array_push($calendar, $lesson);   
                    }
                }catch(\Exception $e){}
            }
        }
        return new Calendar($calendar);
    }

}