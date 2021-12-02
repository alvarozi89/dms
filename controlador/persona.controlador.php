<?php
 foreach($_POST as $variable => $valor) ${$variable}=$valor;
 foreach($_GET as $variable => $valor) ${$variable}=$valor; 
 //$Dcargo= $_POST["dCargo"]; 
  




    require '../modelo/persona_modelo.php';
    if($_POST){
        

        $persona = new Persona();
        switch($_POST["accion"]){
      
            case "CONSULTAR":
             
            echo json_encode($persona->ConsultarCo($_POST["centro_operacion"]));
            
            break;
            case "CONSULTAR_ID":
                echo json_encode($persona->ConsultarPorId($_POST["idPersona"]));
            break;

            case "ENVIAR_MAIL":
                echo json_encode($persona->enviar_mail($_POST["nombre"]));
            break;

            case "ENVIAR_MAILR":
                echo json_encode($persona->enviar_mail($_POST["nombreR"]));
            break;


            case "ENVIAR_MAILM":
                echo json_encode($persona->enviar_mail($_POST["nombreM"]));
            break;

            case "CONSULTAR_ID_CARGO":
                echo json_encode($persona->ConsultarPorIdCargo($_POST["idCargoM"]));
            break;


            case "ConsultarCentro_operacion":
              
                echo json_encode($respuesta=$persona->ConsultarCentro_operacion());
            
            break;


            case "ConsultarCargo":
              
                echo json_encode($respuesta=$persona->ConsultarCargo());
            
            break;



            case "ConsultarArea":
              
                echo json_encode($respuesta=$persona->ConsultarArea());
            
            break;


            case "Cerrar_sesion":
              
                echo json_encode($respuesta=$persona->Cerrar_sesion());
            
            break;



            case "GUARDAR":

             
                $fechaI= $_POST["fechaI"];
                $area= $_POST["area"];
                $co= $_POST["centro_operacion"];
                $cargo= $_POST["cargo"];
                $correo= $_POST["correo_empresarial"];
                $regional= $_POST["regional"];


                
               

          

           
                 if($cedula==""){
                    echo json_encode("Cedula vacia");
                    return;

                }

                else if($nombres==""){
                    echo json_encode("Nombres vacios");
                    return;

                }

                else if($apellidos==""){
                    echo json_encode("Apellidos vacio");
                    return;

                }


                else if($sexo=="Seleccione su genero"){
                    echo json_encode("Sexo vacio");
                    return;

                }


                else if($telefono==""){
                    echo json_encode("Telefóno vacio");
                    return;

                }

                else if($regional=="Regional"){
                    echo json_encode("Regional vacia");
                    return;

                }


                


                else if($area=="Seleccione area de trabajo"){
                    echo json_encode("Area de trabajo vacio");
                    return;

                }


                else if($co=="TODOS"){
                    echo json_encode("La opción todos no es valida");
                    return;

                }

                else if($co=="Seleccione Centro de operaciones"){
                    echo json_encode("Centro de operaciones vacio");
                    return;

                }


                else if($cargo=="Seleccione Cargo actual"){
                    echo json_encode("Cargo vacio");
                    return;

                }

                else if($fecha_nacimiento==""){
                    echo json_encode("fecha nacimiento vacia");
                    return;

                }

                else if($fechaI==""){
                    echo json_encode("fecha ingreso vacia");
                    return;

                }


                else if($correo_personal==""){
                    echo json_encode("correo personal vacio");
                    return;

                }

                else if($correo==""){
                    echo json_encode("correo empresarial vacio");
                    return;

                }
                

               

                else{
                  
    
                    
                    $respuesta=$persona->GuardarPersona($nombres,$apellidos,$cedula,$sexo,$telefono,$correo_personal,$fecha_nacimiento);
                  
                    echo json_encode($respuesta);
                    break;


                }


               
                case "guardarCargo":
                    $Dcargo= $_POST["dCargo"];

                    if($Dcargo==""){
                        echo json_encode("Campo de texto vacio");
                        return;
    
                    }
                    else{
                        $respuesta=$persona->guardarCargo($Dcargo);
                        echo json_encode($respuesta);
                    }
                   
                  
                break;


                case "ModificarCargo":
                    $Dcargo= $_POST["dCargoM"];
                    $Idcargo= $_POST["idCargoM"];

                    if($Dcargo==""){
                        echo json_encode("Campo de texto vacio");
                        return;
    
                    }
                    else{
                        $respuesta=$persona->ModificarCargo($Dcargo,$Idcargo);
                        echo json_encode($respuesta);
                    }
                   
                  
                break;



             

           

            case "MODIFICAR":
            /*     $id= $_POST["idPersona"];
                $cedula= $_POST["cedula"];
                $nombres= $_POST["nombre"];
                $apellido= $_POST["apellido"]; 
                $direccion= $_POST["direccion"];
                $telefono= $_POST["telefono"];
                $correo= $_POST["correo"];
                $cargo= $_POST["cargo"]; */

                $id_regional= $_POST["regionalM"];
                $id_area= $_POST["area"];
                $id_centro_operacion= $_POST["centro_operacion"];
                $id_cargo= $_POST["cargo"];


               if($cedula==""){
                    echo json_encode("Campo cedula vacio");
                    return;

                }


                else if($nombre==""){
                    echo json_encode("Campo nombres vacio");
                    return;

                }

                else if($apellido==""){
                    echo json_encode("Campo apellido vacio");
                    return;

                }

             

                else if($telefono==""){
                    echo json_encode("Campo telefono vacio");
                    return;

                }

                else if($correo_personal==""){
                    echo json_encode("Campo correo personal vacio");
                    return;

                }

                else if($correo_empresarial==""){
                    echo json_encode("Campo correo empresarial vacio");
                    return;

                }

                else if($id_regional=="Regional"){
                    echo json_encode("Debe seleccionar regional");
                    return;

                }

                else if($id_area=="Seleccione area de trabajo"){
                    echo json_encode("Debe seleccionar un area de trabajo");
                    return;

                }

                else if($id_centro_operacion=="Seleccione Centro de operaciones"){
                    echo json_encode("Debe Seleccionar Centro de operaciones");
                    return;

                }

                else if($id_centro_operacion=="TODOS"){
                    echo json_encode("Debe Seleccionar Centro de operaciones");
                    return;

                }

                else if($id_cargo=="Seleccione Cargo actual"){
                    echo json_encode("Debe seleccionar Cargo actual");
                    return;

                }

                

                else{
                    
                    $respuesta=$persona->Modificar($nombre,$apellido,$cedula,$telefono,$correo_personal,$idPersona,$correo_empresarial,$id_regional,$id_area,$id_centro_operacion,$id_cargo);
                    echo json_encode($respuesta);
                    break;

                }

               


            case "ELIMINAR":
                $idPersona=$_POST["idPersona"];
                $respuesta=$persona->Eliminar($idPersona);
                echo json_encode($respuesta);
            break;



      

        }
    }
    


?>