<?php
namespace Pirifle\SchoolToIcal;
use DateTime;

class Lesson{
    public function __construct(string $name, Teacher $teacher,Classroom $classroom,DateTime $from,DateTime $to) {
        $this->name = $name;
        $this->teacher = $teacher;
        $this->classroom = $classroom;
        $this->from = $from;
        $this->to = $to;
    }
    public string $name;
    public Teacher $teacher;
    public Classroom $classroom;
    public DateTime $from;
    public DateTime $to;

}