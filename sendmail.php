<?php
$name = $_POST['name'];
$email = $_POST['email'];
$title = $_POST['title'];
$message = $_POST['message'];
$name = htmlspecialchars($name);
$email = htmlspecialchars($email);
$title = htmlspecialchars($title);
$message = htmlspecialchars($message);
$name = strip_tags($name);
$email = strip_tags($email);
$title = strip_tags($title);
$message = strip_tags($message);
$name = stripslashes($name);
$email = stripslashes($email);
$title = stripslashes($title);
$message = stripslashes($message);
$name = urldecode($name);
$email = urldecode($email);
$title = urldecode($title);
$message = urldecode($message);
$name = trim($name);
$email = trim($email);
$title = trim($title);
$message = trim($message);
if (mail("epselent33@gmail.com", "заявка с сайта" . $title, "Имя: " . $name . "Email: " . $email . "Сообщение: " . $message . "From: info@denisdev.com \r\n")) {
	echo "ok";
} else {
	echo "not";
}
?>