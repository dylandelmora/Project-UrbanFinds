<?php
$host = "localhost"; // Server database
$user = "root"; // Username MySQL
$password = ""; // Password MySQL (kosong jika default di XAMPP)
$database = "urbanfinds"; // Nama database

// Membuat koneksi
$conn = new mysqli($host, $user, $password, $database);

// Cek koneksi
if ($conn->connect_error) {
    die("Koneksi gagal: " . $conn->connect_error);
}
?>