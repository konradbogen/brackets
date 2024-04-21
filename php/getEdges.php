<?php
    header("Access-Control-Allow-Origin: *");
    $db = new SQLite3("data.db");
    $result = $db->query("SELECT * FROM Edges;");
    $data = array();
    while ($row = $result->fetchArray(SQLITE3_ASSOC)){
        array_push($data, $row);
    }
    echo json_encode($data);