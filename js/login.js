
function IniciarSesion() {
    var usuario = document.getElementById('cedulaL').value;
    var contrasena = document.getElementById('contrasenaL').value;

    if (usuario == "") {

        alertas("!Error!", "Debe ingresar usuario", "error");
    
        return;
    }

    if (contrasena == "") {

        alertas("!Error!", "Debe ingresar contraseña", "error");
        return;
    }

    var datos = {
        "cedulaL": usuario,
        "contrasenaL": contrasena
    };

    $.ajax({
        url: 'controlador/login.controlador.php',
        data: datos,
        type: 'POST',
        dataType: 'json'
    }).done(function(data) {
       
        if (data == "OK") {
            //alert('Sesion iniciada');
           
            alert("Inicio de sesión correcto...");

            window.location = 'formulario_principal.html';
            //alertas("!Exito!", "Datos modificados con exito", "success");








        } else {
            alertas("!Error!", "Usuario o contraseña incorrecto", "error");
        }
    }).fail(function(data) {
     

        console.log(data);


    });

}

function alertas(titulo, descripcion, tipoAlerta) {
    Swal.fire(
        titulo,
        descripcion,
        tipoAlerta


    );

}


function enviar_mailRecuperarPass(nombre) {
    cedula = document.getElementById('ideAdmin').value;
   
    var nombre = "Ha solicitado recuperar PASS" + '<br>'+ "Su usuario es: 1087125302 "+'<br>' + "Su contrasena es: 123";
    $.ajax({
        url: 'controlador/persona.controlador.php',
        data: { "nombreR": nombre, "accion": "ENVIAR_MAILR" },
        type: "POST",
    }).done(function(response) {

        if (response == "Mensaje enviado") {

            alert("Revisa tu correo")
            console.log(response);
            alert(""+response)


        } else {

            //alertas("!Advertencia!", "hola", "error");

        }

        console.log(response);
        //alert(response);



    }).fail(function(response) {
        //alert("Algo salió mal");
        console.log(response);
    });

}

