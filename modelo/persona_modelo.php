<?php
   /*  foreach($_POST as $variable => $valor) ${$variable}=$valor;
    foreach($_GET as $variable => $valor) ${$variable}=$valor;  */  

    require 'conexion.php';
    use PHPMailer\PHPMailer\PHPMailer;
    use PHPMailer\PHPMailer\Exception;

    require '../assets/PHPMailer/src/Exception.php';
    require '../assets/PHPMailer/src/PHPMailer.php';
    require '../assets/PHPMailer/src/SMTP.php';
   

    class Persona{

        public function ConsultarTodo(){
            $conexion= new Conexion();
            $stmt=$conexion->prepare("SELECT * FROM persona");
            $stmt->execute();
            return $stmt->fetchAll(PDO::FETCH_OBJ);

        }

        public function ConsultarPersona(){
            $conexion= new Conexion();
            $stmt=$conexion->prepare("SELECT
            persona.id_persona,
            persona.nombres,
            persona.id_persona,
            persona.apellidos,
            persona.numero_identificacion,
            persona.celular,
            persona.direccion,
            persona.correo,
            tipo_persona.rol,
            persona.fecha_registro
            FROM
            persona
            INNER JOIN tipo_persona ON persona.id_tipo_persona = tipo_persona.id_tipo_persona");
            //$stmt->bindValue(":idPersona",$id, PDO::PARAM_INT); 
            $stmt->execute();
            return $stmt->fetchAll(PDO::FETCH_OBJ);

        }

        public function ConsultarCo($co){
            $conexion= new Conexion();
           // $rol= $_POST['roles']; 
            $stmt=$conexion->prepare("SELECT
            persona.id_persona,
            persona.nombres,
            persona.apellidos,
            persona.cedula,
            persona.telefono,
            persona.correo_personal,
            funcionario.correo_empresarial,
            funcionario.id_centro_operacion,
            funcionario.id_regional,
            funcionario.id_cargo,
            funcionario.id_area,
            centro_operacion.descripcion_centro,
            cargo.descripcion_cargo 
            FROM
            funcionario
            INNER JOIN persona ON funcionario.id_persona = persona.id_persona
            INNER JOIN centro_operacion ON funcionario.id_centro_operacion = centro_operacion.id_centro_operacion
            INNER JOIN cargo ON funcionario.id_cargo = cargo.id_cargo WHERE centro_operacion.id_centro_operacion=:co");
            $stmt->bindValue(":co",$co, PDO::PARAM_INT); 
            $stmt->execute();
            //return $stmt->fetchAll(PDO::FETCH_OBJ);
            //return $stmt->setFetchMode(PDO::FETCH_ASSOC);
            if($co=="Seleccione Centro de operaciones")  {
                return "mal";
            }

            else if($co=="TODOS")  {
                $stmt=$conexion->prepare("SELECT
                persona.id_persona,
                persona.nombres,
                persona.apellidos,
                persona.cedula,
                persona.telefono,
                persona.correo_personal,
                funcionario.correo_empresarial,
                funcionario.id_centro_operacion,
                funcionario.id_regional,
                funcionario.id_cargo,
                funcionario.id_area,
                centro_operacion.descripcion_centro,
                cargo.descripcion_cargo 
            FROM
                funcionario
                INNER JOIN persona ON funcionario.id_persona = persona.id_persona
                INNER JOIN centro_operacion ON funcionario.id_centro_operacion = centro_operacion.id_centro_operacion
                INNER JOIN cargo ON funcionario.id_cargo = cargo.id_cargo");
                //$stmt->bindValue(":idPersona",$id, PDO::PARAM_INT); 
                $stmt->execute();
                return $stmt->fetchAll(PDO::FETCH_OBJ);
            }

            else {

                return $stmt->fetchAll(PDO::FETCH_ASSOC);
            }

          

        }


        public function ConsultarCentro_operacion(){

            $conexion= new Conexion();
            $stmt=$conexion->prepare("SELECT * FROM centro_operacion");
            $stmt->execute();
            return $stmt->fetchAll(PDO::FETCH_OBJ);
        }


        public function ConsultarCargo(){

            $conexion= new Conexion();
            $stmt=$conexion->prepare("SELECT * FROM cargo");
            $stmt->execute();
            return $stmt->fetchAll(PDO::FETCH_OBJ);
        }


        public function Consultararea(){
           
            $conexion= new Conexion();
            $stmt=$conexion->prepare("SELECT * FROM area");
            $stmt->execute();
            return $stmt->fetchAll(PDO::FETCH_OBJ);
        }


        public function ConsultarPorId($idPersona){

            $conexion= new Conexion();
            $stmt=$conexion->prepare("SELECT
            persona.id_persona,
            persona.nombres,
            persona.apellidos,
            persona.cedula,
            persona.telefono,
            persona.correo_personal,
            funcionario.id_funcionario,
            funcionario.correo_empresarial,
            funcionario.id_centro_operacion,
            centro_operacion.descripcion_centro,
            area.area,
            area.id_area,
            cargo.id_cargo,
            cargo.descripcion_cargo,
            regional.id_regional,
            regional.regional 
        FROM
            persona
            INNER JOIN funcionario ON persona.id_persona = funcionario.id_persona
            INNER JOIN centro_operacion ON funcionario.id_centro_operacion = centro_operacion.id_centro_operacion
            INNER JOIN area ON funcionario.id_area = area.id_area
            INNER JOIN cargo ON funcionario.id_cargo = cargo.id_cargo
            INNER JOIN regional ON funcionario.id_regional = regional.id_regional where persona.id_persona=:idPersona");
            $stmt->bindValue(":idPersona",$idPersona, PDO::PARAM_INT);
            $stmt->execute();
            return $stmt->fetch(PDO::FETCH_OBJ);
        }

        public function ConsultarPorIdCargo($id){

            $conexion= new Conexion();
            $stmt=$conexion->prepare("SELECT * from tipo_cargo where id_cargo=:idCargoM");
            $stmt->bindValue(":idCargoM",$id, PDO::PARAM_INT);
            $stmt->execute();
            return $stmt->fetch(PDO::FETCH_OBJ);
        }


        public function ValidarPersona($cedula){

            $conexion= new Conexion();
            $stmt=$conexion->prepare("SELECT numero_identificacion FROM persona WHERE numero_identificacion=:cedula");
            $stmt->bindValue(":cedula",$cedula, PDO::PARAM_INT);
            $stmt->execute();
            return $stmt->fetch(PDO::FETCH_OBJ);
        }

        public function guardarCargo($Dcargo){
            $conexion= new Conexion();
            //$Dcargo= $_POST["dCargo"]; 
            $stmt = $conexion->prepare("INSERT INTO `tipo_cargo`
            (`descripcion`)
            VALUES (:dCargo);"); 
            $stmt->bindParam(":dCargo",$Dcargo,PDO::PARAM_STR);
            if($stmt->execute()){
            return"ok";
    
            }else{
                return"Se ha generado un error";
            }

        }


        public  function GuardarPersona($nombres,$apellidos,$cedula,$sexo,$telefono,$correo_personal,$fecha_nacimiento){
            $conexion= new Conexion();
           
            $cargo= $_POST["cargo"];  
            $correo_emmpresarial= $_POST["correo_empresarial"]; 
            $fechaI= $_POST["fechaI"]; 
            $centroO= $_POST["centro_operacion"]; 
            $area= $_POST["area"]; 
            $fechaR= $_POST["fechaR"]; 
            $regional= $_POST["regional"];
           

            $stmt=$conexion->prepare("SELECT cedula FROM persona WHERE cedula=:cedula");
            $stmt->bindValue(":cedula",$cedula, PDO::PARAM_INT);
            $stmt->execute();
            $numeroDeFilas = $stmt->rowCount();
            
            if($numeroDeFilas>0){

                return"Ya existe";

            }

            else{
       
            $stmt = $conexion->prepare("INSERT INTO `persona`
                        (
                        `nombres`,
                        `apellidos`,
                        `cedula`,
                        `sexo`,
                        `telefono`,
                        `correo_personal`,
                        `fecha_nacimiento`)
            VALUES (
                    :nombres,
                    :apellidos,
                    :cedula,
                    :sexo,
                    :telefono,
                    :correo_personal,
                    :fecha_nacimiento);"); 

            $stmt->bindValue(":nombres",$nombres,PDO::PARAM_STR);
            $stmt->bindValue(":apellidos",$apellidos,PDO::PARAM_STR);
            $stmt->bindValue(":cedula",$cedula,PDO::PARAM_STR);
            $stmt->bindValue(":sexo",$sexo,PDO::PARAM_STR);
            $stmt->bindValue(":telefono",$telefono,PDO::PARAM_STR);
            $stmt->bindValue(":correo_personal",$correo_personal,PDO::PARAM_STR);
            $stmt->bindValue(":fecha_nacimiento",$fecha_nacimiento,PDO::PARAM_STR);
         
        }
        
           if($stmt->execute()){
            $id_usuario = $conexion->lastInsertId();


           $stmt = $conexion->prepare("INSERT INTO `funcionario`
                        (
                        `id_persona`,
                        `correo_empresarial`,
                        `fecha_ingreso`,
                        `id_regional`,
                        `id_centro_operacion`,
                        `id_cargo`,
                        `id_area`,
                        `fecha_registro`)
            VALUES (
                    :id_persona,
                    :correo_empresarial,
                    :fecha_ingreso,
                    :id_regional,
                    :id_centro_operacion,
                    :id_cargo,
                    :id_area,
                    :fecha_registro);"); 

                $stmt->bindParam(":id_persona",$id_usuario ,PDO::PARAM_INT);
                $stmt->bindValue(":correo_empresarial",$correo_emmpresarial,PDO::PARAM_STR);
                $stmt->bindValue(":fecha_ingreso",$fechaI,PDO::PARAM_STR);
                $stmt->bindValue(":id_regional",$regional,PDO::PARAM_INT);
                $stmt->bindValue(":id_centro_operacion",$centroO,PDO::PARAM_INT);
                $stmt->bindValue(":id_cargo",$cargo,PDO::PARAM_INT);
                $stmt->bindValue(":id_area",$area,PDO::PARAM_INT);
                $stmt->bindValue(":fecha_registro",$fechaR,PDO::PARAM_STR);
                $stmt->execute(); 
           
                return"ok";
             
                
            }
        

            else{
                return"Se ha generado un error";
            } 
         
           
        }
        
        public function Modificar($nombre,$apellido,$cedula,$telefono,$correo_personal,$idPersona, $correo_empresarial,$id_regional,$id_area,$id_centro_operacion,$id_cargo){
            $conexion= new Conexion();
         
            
        
   /*          $correo_empresarial= $_POST["correoEm"];
            $id_regional= $_POST["regionalM"];
            $id_area= $_POST["area"];
            $id_centro_operacion= $_POST["centro_operacion"];
            $id_cargp= $_POST["cargo"];
            $idPersona= $_POST["idPersona"]; */
            //$idPersona= $_POST["idPersona"];
           
            
            $stmt=$conexion->prepare("UPDATE `persona` set `nombres`=:nombreM,`apellidos`=:apellido,`cedula`=:cedula,`telefono`=:telefono,`correo_personal`=:correo_personal where id_persona=:idPersona");
            $stmt->bindValue(":idPersona",$idPersona,PDO::PARAM_INT);
            $stmt->bindValue(":nombreM",$nombre,PDO::PARAM_STR);
            $stmt->bindValue(":cedula",$cedula,PDO::PARAM_STR);
            $stmt->bindValue(":apellido",$apellido,PDO::PARAM_STR);
            $stmt->bindValue(":correo_personal",$correo_personal,PDO::PARAM_STR);
            $stmt->bindValue(":telefono",$telefono,PDO::PARAM_STR);
           


            $stmt->execute();


            $stmt=$conexion->prepare("UPDATE `funcionario` set `correo_empresarial`=:correo_empresarial,`id_regional`=:regionalM,`id_area`=:area ,`id_centro_operacion`=:centro_operacion ,`id_cargo`=:cargo where id_persona=:idPersona");
            $stmt->bindValue(":correo_empresarial",$correo_empresarial,PDO::PARAM_STR);
            $stmt->bindValue(":regionalM",$id_regional,PDO::PARAM_STR);
            $stmt->bindValue(":area",$id_area,PDO::PARAM_STR);
            $stmt->bindValue(":centro_operacion",$id_centro_operacion,PDO::PARAM_STR);
            $stmt->bindValue(":cargo",$id_cargo,PDO::PARAM_STR);
            $stmt->bindValue(":idPersona",$idPersona,PDO::PARAM_STR);


            
            
          
    
            if($stmt->execute()){



                

            
            return"ok";
        }
            
            else{
                return"Se ha generado un error";
            }
         
           
        }



        

        public function ModificarCargo($Dcargo,$Idcargo){
            $conexion= new Conexion();
            
            $stmt=$conexion->prepare("UPDATE `tipo_cargo` set `descripcion`=:dCargoM where `id_cargo`=:idCargoM");
           
            $stmt->bindValue(":dCargoM",$Dcargo,PDO::PARAM_STR);
            $stmt->bindValue(":idCargoM",$Idcargo,PDO::PARAM_INT);
    
            if($stmt->execute()){
                return"ok";
    
            }else{
                return"Se ha generado un error";
            }
         
           
        }


        public function Eliminar($idPersona){
            $conexion= new Conexion();
            $stmt=$conexion->prepare("DELETE from persona where id_persona=:idPersona");
            $stmt->bindValue(":idPersona",$idPersona,PDO::PARAM_INT);
       
    
            if($stmt->execute()){
                return"ok";
    
            }else{
                return"Se ha generado un error";
            }
         
           
        }


        public function enviar_mail($nombre){
            // $nombre= $_POST["nombre"]; 
 
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
                 $mail->addAddress('alvarozi@hotmail.es');     //Add a recipient
              
             
                 //Attachments
                 //$mail->addAttachment('/var/tmp/file.tar.gz');         //Add attachments
                 //$mail->addAttachment('/tmp/image.jpg', 'new.jpg');    //Optional name
             
                 //Content
                 $mail->isHTML(true);                                  //Set email format to HTML
                 $mail->Subject = 'Actualizacion de registro';
                 $mail->Body    = $nombre;
                // $mail->Body    = 'se ha llenado un registro</b>';
                 $mail->AltBody = 'este es el body';
                 if($mail->send()){
                     
                     return"Mensaje enviado";
         
                 }
           
                 //echo 'mensaje enviado';
               
             } catch (Exception $e) {
                 //echo "Message could not be sent. Mailer Error: {$mail->ErrorInfo}";
                 return "Message could not be sent. Mailer Error: {$mail->ErrorInfo}";
             }
             
     
     
         }


         public function cerrar_sesion(){

                @session_start();
                session_destroy();
                //header("Location: index.html");

         }




    }

 



?>