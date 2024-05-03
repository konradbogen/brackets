<?php
// Set CORS headers to allow requests from any origin (not recommended for production)
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

// Database connection parameters
$servername = "s198.goserver.host";
$username = "web177_3";
$password = "Ten.avaj99";
$dbname = "web177_db3";

// Create a new MySQL database connection
$db = new mysqli($servername, $username, $password, $dbname);

// Check for database connection errors
if ($db->connect_error) {
    http_response_code(500); // Internal Server Error
    die("Connection failed: " . $db->connect_error);
}

// Perform database query to select all entries
$results = $db->query('SELECT * FROM Entries');

// Check for query execution errors
if (!$results) {
    http_response_code(500); // Internal Server Error
    die("Query error: " . $db->error);
}

// Prepare data array to hold query results
$data = array();

// Fetch and store query results in the data array
while ($row = $results->fetch_assoc()) {
    $data[] = $row;
}

// Close the database connection
$db->close();

// Set response header to indicate JSON content
header("Content-Type: application/json");

// Send JSON-encoded data back to the client
echo json_encode($data);

