<?php
    $servername = "s198.goserver.host";  // Hostname des Datenbankservers
    $username = "web177_3";     // Benutzername für den Datenbankzugriff
    $password = "Ten.avaj99";     // Passwort für den Datenbankzugriff
    $dbname = "web177_db3";  // Name der Datenbank

    $db = new mysqli($servername, $username, $password, $dbname);
        
    $results = $db->query('SELECT * FROM Entries');
    $data = array();
    while ($row = $results->fetch_assoc()) {
        array_push($data, $row);
    }
    echo json_encode($data);
    $db->close();
