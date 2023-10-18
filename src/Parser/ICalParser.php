<?php
namespace Pirifle\SchoolToIcal\Parser;

use Pirifle\SchoolToIcal\Calendar;
use \ParseError;

class ICalParser{
    /**
     * @param Calendar $cal
     * @throws ParseError
     **/
    public function send($cal)
    {
        $events = [];

        foreach ($cal->lessonPlan as $lesson) {    
            $event = (new \Eluceo\iCal\Domain\Entity\Event())
                ->setSummary($lesson->name)
                ->setDescription("Teacher: ".$lesson->teacher->name." Classroom: ".$lesson->classroom->room_number)
                ->setOccurrence(
                    new \Eluceo\iCal\Domain\ValueObject\TimeSpan(
                        new \Eluceo\iCal\Domain\ValueObject\DateTime($lesson->from, false),
                        new \Eluceo\iCal\Domain\ValueObject\DateTime($lesson->to, false),
                    )
                );
            array_push($events, $event);
        }

        $calendar = new \Eluceo\iCal\Domain\Entity\Calendar($events);


        $componentFactory = new \Eluceo\iCal\Presentation\Factory\CalendarFactory();
        $calendarComponent = $componentFactory->createCalendar($calendar);


        header('Content-Type: text/calendar; charset=utf-8');
        header('Content-Disposition: attachment; filename="cal.ics"');

        echo $calendarComponent;

    }
}
