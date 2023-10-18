<?php
require dirname(__FILE__) ."/vendor/autoload.php";

use Pirifle\SchoolToIcal\Provider\HTTPCalendarProvider;
use Pirifle\SchoolToIcal\Parser\ICalParser;

if (!isset($_GET["class"])){
    http_response_code(404);
    die();
}

$provider = new HTTPCalendarProvider("http://plan.elektryk.opole.pl/", "http://zastepstwa.elektryk.opole.pl/");

$cal = $provider->parse($_GET["class"]);

$parser = new ICalParser;

$parser->send($cal);