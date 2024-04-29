<?php
   $servername = "localhost";  // Hostname des Datenbankservers
   $username = "web177_2";     // Benutzername für den Datenbankzugriff
   $password = "root";     // Passwort für den Datenbankzugriff
   $dbname = "root";  // Name der Datenbank

    $db = new mysqli($servername, $username, $password, $dbname);
    
    $result = $db->query("SELECT * FROM Edges;");
    $data = array();
    while ($row = $result->fetch_assoc()){
        array_push($data, $row);
    }
    echo json_encode($data);
    $db->close();