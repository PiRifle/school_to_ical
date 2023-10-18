<?php

use PHPHtmlParser\Dom\Node\HtmlNode;

/**
 * Parses an HTML table and returns the data as a 2D array.
 *
 * @param HtmlNode $html The CSS selector to locate the table.
 *
 * @return HtmlNode[][]|null A 2D array representing the table data, or null if the table is not found.
 */
function parseHTMLTable(HtmlNode $html) {
    if ($html) {
        $data = array();

        // Loop through the rows in the html
        foreach ($html->find('tr') as $row) {
            $rowData = array();

            // Loop through the cells in each row
            foreach ($row->find('td') as $cell) {
                $rowData[] = $cell;
            }

            $data[] = $rowData;
        }

        return $data;
    } else {
        return null; // html not found
    }
}


