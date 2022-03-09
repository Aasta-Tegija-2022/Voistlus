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

$sql = "SELECT sisu FROM tekst WHERE grupp=?"; // SQL with parameters
$stmt = $conn->prepare($sql);

$grupp = "ITA";
$stmt->bind_param("s", $grupp);
$stmt->execute();
$itaresult = $stmt->get_result();

$grupp = "ITS";
$stmt->bind_param("s", $grupp);
$stmt->execute();
$itsresult = $stmt->get_result();

$grupp = "NONE";
$stmt->bind_param("s", $grupp);
$stmt->execute();
$result = $stmt->get_result();

$conn->close();
?>