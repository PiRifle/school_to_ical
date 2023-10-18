<?php
namespace Pirifle\SchoolToIcal;

class Substitution extends Lesson {   
    public Teacher $orginal_teacher;
    public Classroom $orginal_classroom;

    public string $additional_info;
}