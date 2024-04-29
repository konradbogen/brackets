<?php
    $servername = "localhost";  // Hostname des Datenbankservers
    $username = "web177_2";     // Benutzername für den Datenbankzugriff
    $password = "root";     // Passwort für den Datenbankzugriff
    $dbname = "root";  // Name der Datenbank

    
    $bracket = $_POST['bracket'];
    $content = $_POST['content'];
    $deleteQuery = "DELETE FROM Entries WHERE bracket='" . $bracket . "'";
    $deleteEdgeQuery =  "DELETE FROM Edges WHERE target='" . $bracket . "' OR source='" . $bracket . "'";
    
    $query = "INSERT INTO Entries (bracket, content) VALUES ('" . $bracket . "', '" . $content . "')";
    echo $query;
   
 
    $db = new mysqli($servername, $username, $password, $dbname);
    $db->query($deleteQuery);
    $db->query($deleteEdgeQuery);
    $db->query($query);
    $db->close();