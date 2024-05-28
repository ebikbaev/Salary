<?php
require 'db.php';

$data = json_decode(file_get_contents('php://input'), true);
$username = $data['username'];
$password = $data['password'];

if (!$username || !$password) {
    echo json_encode(['message' => 'Please provide a username and password.']);
    exit;
}

$sql = "SELECT password FROM users WHERE username = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("s", $username);
$stmt->execute();
$stmt->bind_result($hashed_password);
$stmt->fetch();

if (password_verify($password, $hashed_password)) {
    echo json_encode(['message' => 'Login successful.']);
} else {
    echo json_encode(['message' => 'Login failed.']);
}

$stmt->close();
$conn->close();
?>
