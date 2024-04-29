<?php
// Verbindungsdaten zur MySQL-Datenbank
$servername = "s198.goserver.host";  // Hostname des Datenbankservers
$username = "web177_2";     // Benutzername für den Datenbankzugriff
$password = "Ten.avaj99";     // Passwort für den Datenbankzugriff
$dbname = "web177_db2";  // Name der Datenbank

// Verbindung zur MySQL-Datenbank herstellen
$conn = new mysqli($servername, $username, $password, $dbname);

// Überprüfen, ob die Verbindung erfolgreich hergestellt wurde
if ($conn->connect_error) {
    die("Verbindung fehlgeschlagen: " . $conn->connect_error);
}

// SQL-Abfrage zum Abrufen von Daten aus einer Tabelle
$sql = "SELECT * FROM Entries";  // Beispiel: "table_name" durch den Namen deiner Tabelle ersetzen
$result = $conn->query($sql);

// Überprüfen, ob Ergebnisse vorhanden sind und diese verarbeiten
if ($result->num_rows > 0) {
    // Daten aus der Abfrage durchlaufen und anzeigen
    while ($row = $result->fetch_assoc()) {
        echo "Bracket: " . $row["bracket"] . " - Content: " . $row["content"] . "<br>";
        // Beispiel: "id" und "name" durch die Spalten deiner Tabelle ersetzen
    }
} else {
    echo "Keine Ergebnisse gefunden";
}

// Verbindung zur Datenbank schließen
$conn->close();

