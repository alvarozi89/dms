<?php
    require 'conexion.php';

    class Login{

     
        public function IniciarSesion($usuario, $contrasena){
            $sql ="SELECT * FROM usuario WHERE usuario.usuario='$usuario' && contraseña= '$contrasena'";
            $conexion = new Conexion();
            $stmt = $conexion->prepare($sql);
            $stmt->execute();
            $obj_usuario = $stmt->fetch(PDO::FETCH_OBJ);
            if(!$obj_usuario){
                // retornar mensaje indicando que el usuario no existe
                return "El usuario no existe o contraseña incorrecta";
            }else{
                //validar la contraseña
                //$contrasena = md5($contrasena);
                /* if($obj_usuario->contraseña !== $contrasena){
                    // retornamos mensaje que la contraseña no coincide
                    return "La contraseña ingresada no coincide";
                } */

               // session_start();
                
                //$_SESSION["cedulaL"] = $obj_usuario->idUsuario;
               //$_SESSION["contrasenaL"] = $obj_usuario->login;
                return "OK";
            }
        }
    }

?>