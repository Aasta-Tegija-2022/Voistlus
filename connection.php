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

$itasql = "SELECT sisu FROM tekst WHERE grupp = 'ITA'";
$itaresult = $conn->query($itasql);

$itssql = "SELECT sisu FROM tekst WHERE grupp = 'ITS'";
$itsresult = $conn->query($itssql);

$conn->close();
?>