<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require './/PHPMailer-6.6.5/src/Exception.php';
require './/PHPMailer-6.6.5/src/PHPmailer.php';

$mail = new PHPmailer(true);
$mail->CharSet = 'UTF-8';
$mail->setLanguage('ru', 'phpmailer/language/');
$mail->isHTML(true);
$mail->setFrom('info@denisdev.com');
$mail->addAddress('epselent33@gmail.com');
$mail->Subject = "заявка с сайта ";
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
$body = '<h1><strong>' . $title . '</strong></h1>';
$body .= '<p><strong>Имя: </srong>' . $name . '</p>';
$body .= '<p><strong>Email: </srong>' . $email . '</p>';
$body .= '<p><strong>Сообщение: <.srong>' . $titmessagele . '</p>';
if (!empty($_FILES['tamplets']['tmp_name'])) {
	$filePath = __DIR__ . "/files/" . $_FILES['tamplets']['name'];
	if (copy($_FILES['tamplets']['tmp_name'], $filePath)) {
		$fileAtach = $filePath;
		$body .= '<p><strong>Фото в приложении<.srong></p>';
		$mail->addAttachment($fileAtach);
	}
}
$mail->Body = $body;
if (!$mail->send()) {
	$mes = 'Ошибка';
} else {
	$mes = 'Данные отправлены';
}
$response = ['message' => $message];
header('Content-type: application/json');
echo json_encode($response);
?>