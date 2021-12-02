<?php
 foreach($_POST as $variable => $valor) ${$variable}=$valor;
 foreach($_GET as $variable => $valor) ${$variable}=$valor; 
 require_once  '../modelo/login.modelo.php';
 

    if($_POST){
        $usuario = $_POST["cedulaL"];
        $contrasena = $_POST["contrasenaL"];

        if ($usuario == "") {
            echo json_encode("Debe ingresar el usuario php");
            return;
        }
    
        if ($contrasena == "") {
            echo json_encode("Debe ingresar la contraseña");
            return;
        }

        $modelo = new Login();
        $respuesta = $modelo->IniciarSesion($usuario, $contrasena);
        echo json_encode($respuesta);
    }else{
        echo json_encode("No ha enviado datos desde el formulario");
        return;
    }

?>