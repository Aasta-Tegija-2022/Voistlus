<?php
$servername = "localhost";
$username = "at22user2";
$password = "9!VpeR8RBDZ8";
$dbname = "at22user2_informatsioon";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
  die("Connection failed: " . $conn->connect_error);
}

$sql = "SELECT toimumis_aeg, lopp_aeg, oppegrupp, sundmus  FROM voog";
$result = $conn->query($sql);

$conn->close();
?>