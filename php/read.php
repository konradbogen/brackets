<?php
    header("Access-Control-Allow-Origin: *");
    $db = new SQLite3('data.db');
    $results = $db->query('SELECT * FROM Entries');
    $data = array();
    while ($row = $results->fetchArray(SQLITE3_ASSOC)) {
        array_push($data, $row);
    }
    echo json_encode($data);