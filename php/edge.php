<?php
$servername = "localhost";  // Hostname des Datenbankservers
$username = "web177_2";     // Benutzername für den Datenbankzugriff
$password = "root";     // Passwort für den Datenbankzugriff
$dbname = "root";  // Name der Datenbank

// Create a new MySQL database connection
$db = new mysqli($servername, $username, $password, $dbname);

// Check if the connection was successful
if ($db->connect_error) {
    die("Connection failed: " . $db->connect_error);
}

// Read incoming JSON data
$jsonData = file_get_contents('php://input');

// Decode JSON data into PHP array
$edges = json_decode($jsonData, true);

// Check if JSON decoding was successful
if ($edges === null) {
    // Handle JSON decoding error
    http_response_code(400); // Bad request
    die('Invalid JSON data');
}

// Prepare MySQL statement for inserting edges
$stmt = $db->prepare('INSERT INTO Edges (source, target, value) VALUES (?, ?, ?)');

// Check if statement preparation was successful
if (!$stmt) {
    die("Prepare failed: " . $db->error);
}

// Bind parameters and execute the statement for each edge
foreach ($edges as $edge) {
    $source = $edge['source'];
    $target = $edge['target'];
    $value = $edge['value'];

    $stmt->bind_param('ssi', $source, $target, $value);
    $stmt->execute();

    // Check for errors during execution
    if ($stmt->errno) {
        die("Execute failed: " . $stmt->error);
    }
}

// Close statement
$stmt->close();

// Close database connection
$db->close();

// Respond with success message (optional)
echo 'Edges inserted successfully';

