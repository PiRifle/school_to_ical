<?php
require dirname(__FILE__) . "/vendor/autoload.php";
date_default_timezone_set('Europe/Warsaw');

use Pirifle\SchoolToIcal\Provider\HTTPCalendarProvider;
use Pirifle\SchoolToIcal\Parser\ICalParser;
use Pirifle\SchoolToIcal\Calendar;


$cal = new HTTPCalendarProvider("http://plan.elektryk.opole.pl/");
$cal_wych = [];
$aaa = $cal->get_classes_links();
foreach (array_keys($aaa) as $class) {
    $link = $aaa[$class];
    $class_cal = $cal->get_class_timetable($link);
    foreach ($class_cal->lessonPlan as $lesson) {
        if (trim($lesson->name) == trim("zaj. wych.")){
            $lesson->name =  $lesson->name." ".$class;
            array_push($cal_wych, $lesson);
        }
    }

}



(new ICalParser)->send(new Calendar($cal_wych));
// header("Content-Type: application/json");



// echo json_encode($cal_wych);