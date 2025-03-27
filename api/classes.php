<?php

require dirname(__FILE__) ."/../vendor/autoload.php";

use Pirifle\SchoolToIcal\Provider\HTTPCalendarProvider;
use Pirifle\SchoolToIcal\Parser\ICalParser;

function fetchCalendar($url) {
    // Try different combinations of the URL
    $urls = [
        $url,
        rtrim($url, '/'),
        $url . '/',
        str_replace('http://', 'https://', $url),
        str_replace('https://', 'http://', $url),
        rtrim(str_replace('http://', 'https://', $url), '/'),
        rtrim(str_replace('https://', 'http://', $url), '/'),
        rtrim($url, '/') . '/',
        rtrim(str_replace('http://', 'https://', $url), '/') . '/',
        rtrim(str_replace('https://', 'http://', $url), '/') . '/',
    ];

    foreach ($urls as $tryUrl) {
        try {
            $cal = new HTTPCalendarProvider($tryUrl);
            return array("classes" => $cal->get_classes(), "url" => $tryUrl);
        } catch (Exception $e) {
            // URL didn't work, try the next one
            continue;
        }
    }

    // None of the URLs worked
    throw new Exception('Failed to fetch calendar from any URL.');
}

if (!isset($_GET["plan_url"])){
    http_response_code(404);
    die();
}

try {
    $classes = fetchCalendar($_GET["plan_url"]);
    header("Content-Type: application/json");
    echo json_encode($classes);
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(['error' => $e->getMessage()]);
}