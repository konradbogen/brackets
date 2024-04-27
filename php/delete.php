<?php
    header("Access-Control-Allow-Origin: *");
    $bracket = $_POST['bracket'];
    $deleteQuery = "DELETE FROM Entries WHERE bracket='" . $bracket . "'";
    $deleteEdgeQuery =  "DELETE FROM Edges WHERE target='" . $bracket . "' OR source='" . $bracket . "'";
    $db = new SQLite3("data.db");
    $db->exec($deleteQuery);
    $db->exec($deleteEdgeQuery);
    $db->close();