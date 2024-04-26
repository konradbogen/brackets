<?php
    header("Access-Control-Allow-Origin: *");
    $bracket = $_POST['bracket'];
    $content = $_POST['content'];
    $deleteQuery = "DELETE FROM Entries WHERE bracket='" . $bracket . "'";
    $deleteEdgeQuery =  "DELETE FROM Edges WHERE target='" . $bracket . "' OR source='" . $bracket . "'";
    $query = "INSERT INTO Entries (bracket, content) VALUES ('" . $bracket . "', '" . $content . "')";
    echo $query;
    $db = new SQLite3("data.db");
    $db->exec($deleteQuery);
    $db->exec($deleteEdgeQuery);
    $db->exec($query);
    $db->close();