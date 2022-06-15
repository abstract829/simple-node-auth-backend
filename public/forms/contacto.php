<?php

$firstName = trim($_POST['name']);
$eMail = trim($_POST['email']); 
$subject = $_POST['nudara.techcorp@gmail.com'; // Replace this with your own email address
$message = $_POST['message'];

$msg = "<html><body style='font-family:Arial,sans-serif;'>";
$msg .= "<h2 style='font-weight:bold;border-bottom:1px dotted #ccc;'>Exchange Nudara</h2>\r\n";
$msg .= "<p><strong>De:</strong> " . $firstName . " Email: " . $eMail . "</p>\r\n"; 
$msg .= "<p><strong>Message:</strong> <br /> " . $message . " </p>";
$msg .= "</body></html>";

$headers = "De: " . $firstName . " Email: " . $eMail . " \r\n";
$headers .= 'MIME-Version: 1.0' . "\r\n";
$headers .= 'Content-type: text/html; charset=UTF-8' . "\r\n";

$mail = mail($site_owners_email, $subject, $msg, $headers);
echo "OK";
     
?>