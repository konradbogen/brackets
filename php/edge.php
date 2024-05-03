<?php

header("Access-Control-Allow-Origin: *"); // Allow requests from any origin (not recommended for production)
header("Access-Control-Allow-Methods: GET, POST, OPTIONS"); // Allow specific HTTP methods
header("Access-Control-Allow-Headers: Content-Type, Authorization"); // Allow specific headers

 // Wenn die Anfrage eine OPTIONS-Anfrage ist, antworten Sie mit 200 OK und beenden Sie die Ausführung
 if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

    $servername = "s198.goserver.host";  // Hostname des Datenbankservers
    $username = "web177_3";     // Benutzername für den Datenbankzugriff
    $password = "Ten.avaj99";     // Passwort für den Datenbankzugriff
    $dbname = "web177_db3";  // Name der Datenbank
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
        echo $stmt->error;
    }
}

// Close statement
$stmt->close();

// Close database connection
$db->close();

// Respond with success message (optional)
echo 'Edges inserted successfully';

