<?php

require dirname(__FILE__) ."/../vendor/autoload.php";

use Pirifle\SchoolToIcal\Provider\HTTPCalendarProvider;
use Pirifle\SchoolToIcal\Parser\ICalParser;

if (!isset($_GET["class"]) || !isset($_GET["plan_url"])){
    http_response_code(404);
    die();
}

$cal = new HTTPCalendarProvider($_GET["plan_url"]);


echo $cal->fetch_table($cal->get_classes_links()[$_GET["class"]])->outerHtml;