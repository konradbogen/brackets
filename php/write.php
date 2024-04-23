<?php
    header("Access-Control-Allow-Origin: *");
    $bracket = $_POST['bracket'];
    $content = $_POST['content'];; 
    $query = "INSERT INTO Entries (bracket, content) VALUES ('" . $bracket . "', '" . $content . "')";
    echo $query;
    $db = new SQLite3("data.db");
    $db->exec($query);
    $db->close();