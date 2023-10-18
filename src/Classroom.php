<?php
namespace Pirifle\SchoolToIcal;

class Classroom {
    public function __construct(string $room_number) {
        $this->room_number = $room_number;
    }
    public string $room_number;
}