<?php
require dirname(__FILE__) ."/vendor/autoload.php";
date_default_timezone_set('Europe/Warsaw');

use Pirifle\SchoolToIcal\Provider\HTTPCalendarProvider;
use Pirifle\SchoolToIcal\Parser\ICalParser;

if (!isset($_GET["class"]) || !isset($_GET["plan_url"])){
    http_response_code(404);
    die();
}

$provider = new HTTPCalendarProvider($_GET["plan_url"]);

$cal = $provider->parse($_GET["class"]);

$parser = new ICalParser;

$parser->send($cal);