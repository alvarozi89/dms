<?php
    class Conexion extends PDO{
        public function __construct(){
            try{
                parent::__construct("mysql:host=localhost;dbname=dms","root","admin");
                //parent::__construct("mysql:host=mysql-52724-0.cloudclusters.net:18170;dbname=sf","admin","sistemas2021*");
                parent::exec("set names utf8");
               // echo"Conectado con exito";
                //$conn = mysqli_connect("mysql:host=localhost;dbname=punto21","root","admin");

            }catch(PDOException $e){
                echo"Error al conectar". $e->getMessage();
                exit;
            }

        }


    }


    //$conexion= new Conexion();
  


   


?>