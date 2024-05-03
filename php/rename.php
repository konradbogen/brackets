<?php
    $servername = "s198.goserver.host";  // Hostname des Datenbankservers
    $username = "web177_3";     // Benutzername für den Datenbankzugriff
    $password = "Ten.avaj99";     // Passwort für den Datenbankzugriff
    $dbname = "web177_db3";  // Name der Datenbank
    
    $old = $_POST['old'];
    $new = $_POST['new'];

    $nodeQuery = "UPDATE Entries
    SET bracket = '" . $new . "'
    WHERE bracket = '" . $old . "'";

    $edgeQuerySource = "UPDATE Edges
    SET source = '" . $new . "'
    WHERE source = '" . $old . "'";

    $edgeQueryTarget = "UPDATE Edges
    SET target = '" . $new . "'
    WHERE target = '" . $old . "'";
   
 
    $db = new mysqli($servername, $username, $password, $dbname);
    $db->query($nodeQuery);
    $db->query($edgeQuerySource);
    $db->query($edgeQueryTarget);
    $db->close();