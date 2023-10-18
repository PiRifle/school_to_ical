<?php
namespace Pirifle\SchoolToIcal;

class Teacher{
    public function __construct(string $name) {
        $this->name = $name;
    }
    public string $name;
}