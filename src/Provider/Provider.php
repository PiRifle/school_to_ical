<?php
namespace Pirifle\SchoolToIcal\Provider;

use Pirifle\SchoolToIcal\Calendar;
use ParseError;
class Provider{
    /**
     * @return Calendar
     * @throws ParseError
     **/
    public function parse(string $class)
    {
        return new Calendar([]);

    }
}