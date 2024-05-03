<?php
    
    $servername = "s198.goserver.host";  // Hostname des Datenbankservers
    $username = "web177_3";     // Benutzername für den Datenbankzugriff
    $password = "Ten.avaj99";     // Passwort für den Datenbankzugriff
    $dbname = "web177_db3";  // Name der Datenbank

    $bracket = $_POST['bracket'];
    $deleteQuery = "DELETE FROM Entries WHERE bracket='" . $bracket . "'";
    $deleteEdgeQuery =  "DELETE FROM Edges WHERE target='" . $bracket . "' OR source='" . $bracket . "'";
    
    $db = new mysqli($servername, $username, $password, $dbname);
    $db->query($deleteQuery);
    $db->query($deleteEdgeQuery);
    $db->close();