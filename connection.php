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
$stmt->bind_param("s", $grupp);

$grupp = "ITA";
$stmt->execute();
$itaresult = $stmt->get_result();

$grupp = "ITS";
$stmt->execute();
$itsresult = $stmt->get_result();

$grupp = "NONE";
$stmt->execute();
$result = $stmt->get_result();

$eventsql = "SELECT oppegrupp, sundmus, toimumis_aeg, lopp_aeg FROM voog";
$eventresult = $conn->query($eventsql);

$conn->close();
?>