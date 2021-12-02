<?php
//Import PHPMailer classes into the global namespace
//These must be at the top of your script, not inside a function

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require '../assets/PHPMailer/src/Exception.php';
require '../assets/PHPMailer/src/PHPMailer.php';
require '../assets/PHPMailer/src/SMTP.php';

//Load Composer's autoloader
//require 'vendor/autoload.php';

//Create an instance; passing `true` enables exceptions


Class enviar_correo{

    public function enviar_mail(){


        $mail = new PHPMailer(true);

        try {
            //Server settings
            $mail->SMTPDebug = 0;                      //Enable verbose debug output
            $mail->isSMTP();                                            //Send using SMTP
            $mail->Host       = 'smtp.gmail.com';                     //Set the SMTP server to send through
            $mail->SMTPAuth   = true;                                   //Enable SMTP authentication
            $mail->Username   = 'alvarozi37000@gmail.com';                     //SMTP username
            $mail->Password   = 'santacruzz3700';                               //SMTP password
            $mail->SMTPSecure = 'tls';            //Enable implicit TLS encryption
            $mail->Port       = 587;                                    //TCP port to connect to; use 587 if you have set `SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS`
        
            //Recipients
            $mail->setFrom('alvarozi37000@gmail.com', 'Notificacion');
            $mail->addAddress('alvarozi@hotmail.com');     //Add a recipient
         
        
            //Attachments
            //$mail->addAttachment('/var/tmp/file.tar.gz');         //Add attachments
            //$mail->addAttachment('/tmp/image.jpg', 'new.jpg');    //Optional name
        
            //Content
            $mail->isHTML(true);                                  //Set email format to HTML
            $mail->Subject = 'registros';
            $mail->Body    = 'se ha llenado un registro</b>';
            $mail->AltBody = 'este es el body';
        
            $mail->send();
            echo 'mensaje enviado';
        } catch (Exception $e) {
            echo "Message could not be sent. Mailer Error: {$mail->ErrorInfo}";
        }
        


    }

    
   

}

$persona = new  enviar_correo();

$persona->enviar_mail();


?>