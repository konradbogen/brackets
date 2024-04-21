<?php
      // Allow from any origin
  if (isset($_SERVER['HTTP_ORIGIN'])) {
      // Decide if the origin in $_SERVER['HTTP_ORIGIN'] is one
      // you want to allow, and if so:
      header("Access-Control-Allow-Origin: {$_SERVER['HTTP_ORIGIN']}");
      header('Access-Control-Allow-Credentials: true');
      header('Access-Control-Max-Age: 86400');    // cache for 1 day
  }
  
  // Access-Control headers are received during OPTIONS requests
  if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
      
      if (isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_METHOD']))
          // may also be using PUT, PATCH, HEAD etc
          header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
      
      if (isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_HEADERS']))
          header("Access-Control-Allow-Headers: {$_SERVER['HTTP_ACCESS_CONTROL_REQUEST_HEADERS']}");
  
      exit(0);
  }

  echo "You have CORS!";


// Read incoming JSON data
$jsonData = file_get_contents('php://input');
// Decode JSON data into PHP array
$edges = json_decode($jsonData, true);
if ($edges === null) {
  // Handle JSON decoding error
  http_response_code(400); // Bad request
  die('Invalid JSON data');
}
// Open SQLite database connection (adjust path as needed)
$db = new SQLite3('data.db');
// Prepare SQLite statement for inserting edges
$stmt = $db->prepare('INSERT INTO edges (source, target, value) VALUES (:source, :target, :value)');
// Bind parameters and execute the statement for each edge
foreach ($edges as $edge) {
  $stmt->bindValue(':source', $edge['source'], SQLITE3_TEXT);
  $stmt->bindValue(':target', $edge['target'], SQLITE3_TEXT);
  $stmt->bindValue(':value', $edge['value'], SQLITE3_INTEGER);
  $stmt->execute();
}
// Close statement and database connection
$stmt->close();
$db->close();
// Respond with success message (optional)
echo 'From PHP: Edges inserted successfully';

