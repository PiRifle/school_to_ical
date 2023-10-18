<?php

namespace Pirifle\SchoolToIcal;
use DateTime;

class Calendar{
    /**
     * @var Lesson[] $lessonPlan Description of the string array.
     */
    public array $lessonPlan;

    /**
     * @param Lesson[] $lessonPlan Description of the string array.
     */
    public function __construct($lessonPlan) {
        $this->lessonPlan = $lessonPlan;
    }

    function get_day(DateTime $day){
        
    }

    function get_hour(DateTime $dateTime){

    }

}