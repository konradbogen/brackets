<?php
$servername = "s198.goserver.host";
$username = "web177_3";
$password = "Ten.avaj99";
$dbname = "web177_db3";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

echo "Connected successfully";
$conn->close();
