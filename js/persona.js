var url = "./../controlador/persona.controlador.php"
$(document).ready(function() {

    ConsultarCargo();
    fechaActual();
    ConsultarCentro();
    ConsultarArea();
    
});

function validar_numero(evt) {
    var code = (evt.which) ? evt.which : evt.keyCode;

    if (code == 8) { // backspace.

        return true;

    } else if (code >= 48 && code <= 57) { // is a number.
        return true;
    } else { // other keys.
        alertas("!Cuidado!", "No se permiten caracteres o letras", "warning");
        return false;


    }
}

function soloLetras(e) {
    var key = e.keyCode || e.which,
        tecla = String.fromCharCode(key).toLowerCase(),
        letras = " áéíóúabcdefghijklmnñopqrstuvwxyz",
        especiales = [8, 37, 39, 46],
        tecla_especial = false;

    for (var i in especiales) {
        if (key == especiales[i]) {
            tecla_especial = true;
            break;
        }
    }

    if (letras.indexOf(tecla) == -1 && !tecla_especial) {
        alertas("!Cuidado!", "No se permiten Números", "warning");
        return false;
    }
}

function Consultar(co) {
    //destruir_tabla();
    co = document.getElementById("centro_operacion").value;
    $.ajax({
        data: { "centro_operacion": co, "accion": "CONSULTAR" },
        // data:{"accion":"CONSULTAR2"},
        url: url,
        type: 'POST',
        dataType: 'json'

    }).done(function(response) {
        var html = "";

        if (response == "mal") {

            alertas("!Advertencia!", "Debe seleccionar un centro de operaciones", "error");


        } else {

            ocultarTabla();
            destruir_tabla();



            $.each(response, function(index, data) {


                html += "<tr>";
                html += "<td>" + (index + 1) + "</td>";
                html += "<td>" + data.nombres + "</td>";
                html += "<td>" + data.apellidos + "</td>";
                html += "<td>" + data.cedula + "</td>";
                html += "<td>" + data.telefono + "</td>";
                html += "<td>" + data.correo_personal + "</td>";
                html += "<td>" + data.correo_empresarial + "</td>";
                html += "<td>" + data.descripcion_centro + "</td>";
                html += "<td>" + data.descripcion_cargo + "</td>";
                html += "<td>";
                html += "<button class='btn btn-warning' data-bs-toggle='modal' data-bs-target='#modalMpersona' onclick='ConsultarPorId(" + data.id_persona + ");'><span class='fa fa-edit'></span>Modificar</button>"
                    //html += "<button class='btn btn-danger text-white'  onclick='Eliminar("+data.id_persona+");'><span class='fa fa-trash'></span>Eliminar</button>" //data, llama la variable desde la bd
                    // html+="<button class='btn btn-warning'onclick='ConsultarPorId'("+data.idPersona+");><span class='fa fa-edit'></span>Modificar</button>";
                    // html+="<button class='btn btn-warning'onclick='ConsultarPorId'("+data.idPersona+");><span class='fa fa-edit'></span>Modificar</button>";
                html += "</td>";
                html += "</tr>";

            });


            document.getElementById("datos").innerHTML = html;
            excel2();

        }
    }).fail(function(response) {

        console.log(response);
        //alert("hola"+roles+rol+nota1);

    });

}
//consulta por id
function ConsultarPorId(idPersona) {
    $.ajax({
        url: url,
        data: { "idPersona": idPersona, "accion": "CONSULTAR_ID" },
        type: 'POST',
        dataType: 'json'
    }).done(function(response) {
        ocultar();

        var cod = document.getElementById("centro_operacionM").value = response.id_centro_operacion;
        var cod2 = document.getElementById("area").value = response.id_area;
        var cod3 = document.getElementById("cargo").value = response.id_cargo;

        document.getElementById('idPersona').value = response.id_persona;
        document.getElementById('cedulaM').value = response.cedula;
        document.getElementById('nombreM').value = response.nombres;
        document.getElementById('apellidoM').value = response.apellidos;
        document.getElementById('telefonoM').value = response.telefono;
        document.getElementById('correoM').value = response.correo_personal;
        document.getElementById('correoEm').value = response.correo_empresarial;
        document.getElementById("centro_operacionM").selected = response.descripcion_centro;
        document.getElementById("area").selected = response.area;
        document.getElementById('cargo').selected = response.descripcion_cargo;
        document.getElementById('regional').selectedIndex = response.id_regional;
        //document.getElementById('regional').selected = response.regional;




        //BloquearBotones(false);

    }).fail(function(response) {
        console.log(response);
    });

}


function ConsultarPorIdCargo(idCargo) {
    $.ajax({
        url: url,
        data: { "idCargoM": idCargo, "accion": "CONSULTAR_ID_CARGO" },
        type: 'POST',
        dataType: 'json'
    }).done(function(response) {
        //ocultar();

        document.getElementById('idCargoM').value = response.id_cargo
        document.getElementById('dCargoM').value = response.descripcion


        //BloquearBotones(false);

    }).fail(function(response) {
        console.log(response);
    });

}

function ConsultarCargo() {
    $.ajax({
        url: url,
        data: { "accion": "ConsultarCargo" },
        type: 'POST',
        dataType: 'json'
    }).done(function(response) {
        //html="<option selected>Seleccione Cargo</option>";
        var html = "";
        html = "<option selected>Seleccione Cargo actual</option>";



        $.each(response, function(index, data) {

            html += "<option value=" + data.id_cargo + ">" + data.descripcion_cargo + "</option>";


        });
        document.getElementById("cargo").innerHTML = html;
        //document.getElementById("cargoM").innerHTML = html;

    }).fail(function(response) {
        console.log(response);
    });

}


function ConsultarArea() {
    $.ajax({
        url: url,
        data: { "accion": "ConsultarArea" },
        type: 'POST',
        dataType: 'json'
    }).done(function(response) {
        //html="<option selected>Seleccione Cargo</option>";
        var html = "";
        html = "<option selected>Seleccione area de trabajo</option>";

        $.each(response, function(index, data) {



            html += "<option value=" + data.id_area + ">" + data.area + "</option>";


        });
        document.getElementById("area").innerHTML = html;
        //document.getElementById("areaM").innerHTML = html;

    }).fail(function(response) {
        console.log(response);
    });

}


function ConsultarCentro() {
    $.ajax({
        url: url,
        data: { "accion": "ConsultarCentro_operacion" },
        type: 'POST',
        dataType: 'json'
    }).done(function(response) {
        //html="<option selected>Seleccione Cargo</option>";
        var html = "";

        html = "<option selected>Seleccione Centro de operaciones</option> <option>TODOS</option>";


        $.each(response, function(index, data) {

            html += "<option value=" + data.id_centro_operacion + ">" + data.descripcion_centro + "</option>";


        });
        document.getElementById("centro_operacion").innerHTML = html;
        document.getElementById("centro_operacionM").innerHTML = html;





    }).fail(function(response) {
        console.log(response);
    });

}





function ConsultarTablaCargo() {
    $.ajax({
        url: url,
        data: { "accion": "ConsultarCargo" },
        type: 'POST',
        dataType: 'json'
    }).done(function(response) {
        //html="<option selected>Seleccione Cargo actual</option>";
        var html = "";


        $.each(response, function(index, data) {

            html += "<tr>";
            html += "<td>" + data.id_cargo + "</td>";
            html += "<td>" + data.descripcion + "</td>";

            html += "<td>";
            //html += "<button class='btn btn-warning'  onclick='ConsultarPorIdCargo("+data.id_cargo+");'><span class='fa fa-edit'></span>Modificar</button>"
            html += " <button type='button'  class='btn btn-primary' data-bs-toggle='modal' data-bs-target='#exampleModal' onclick='ConsultarPorIdCargo(" + data.id_cargo + ");'><span class='fa fa-edit'></span>Modificar</button>";
            // html+="<button class='btn btn-warning'onclick='ConsultarPorId'("+data.idPersona+");><span class='fa fa-edit'></span>Modificar</button>";
            html += "</td>";
            html += "</tr>";

            //<button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">Launch demo modal</button>


        });
        document.getElementById("datosCargos").innerHTML = html;
        //excel2();

    }).fail(function(response) {
        console.log(response);
    });

}


function Guardar() {

    $.ajax({
        url: url,
        data: retornarDatos("GUARDAR"),
        type: 'POST',
        dataType: 'json'

    }).done(function(response) {

        if (response == "Ya existe") {

            alertas("!Advertencia!", "El usuario Ya existe", "error");
            console.log(data.nombres);


        } else if (response == "ok") {

            // alert("Datos guardado con exito");
            alertas("!Exito!", "Datos guardados con exito", "success");
            enviar_mail();

            //limpiar();
            //destruir_tabla();
            //Consultar();

            limpiar();

        } else {
            alertas("!Error!", response, "error");
            // alert(response);
        }


    }).fail(function(response) {
        alertas("!Algo salió mal!", response, "error");
        console.log(response);

    });

}


function GuardarEmpleado() {

    $.ajax({
        url: url,
        data: retornarDatos("GuardarEmpleado"),
        type: 'POST',
        dataType: 'json'

    }).done(function(response) {

        if (response == "ok") {





        } else {
            alertas("!Error!", response, "error");
            // alert(response);

        }
        //limpiar();


    }).fail(function(response) {
        alertas("!Algo salió mal!", response, "error");
        console.log(response);

    });

}


function GuardarCargo() {

    $.ajax({
        url: url,
        data: retornarDatosCArgo("guardarCargo"),
        type: 'POST',
        dataType: 'json'

    }).done(function(response) {



        if (response == "ok") {

            alertas("!Exito!", "Datos guardados con exito", "success");
            document.getElementById('dCargo').value = "";
            //limpiar();
            ConsultarTablaCargo();




        } else {
            alertas("!Error!", response, "error");
            // alert(response);

        }
        //limpiar();


    }).fail(function(response) {
        alertas("!Algo salió mal!", response, "error");
        console.log(response);

    });

}


function Modificar() {

    $.ajax({
        url: url,
        data: retornarDatosPersona("MODIFICAR"),
        type: 'POST',
        dataType: 'json'

    }).done(function(response) {

        if (response == "ok") {
            // alert("Datos guardado con exito");
            alertas("!Exito!", "Datos modificados con exito", "success");
            enviar_mail();
            document.getElementById("tablaC").style.display = "none";

            $('#modalMpersona').modal('toggle');
            //limpiar();
            destruir_tabla();
            Consultar();

        } else {
            alertas("!Error!", response, "error");
            //alert(response);

        }
        //limpiar();

    }).fail(function(response) {
        console.log(response);

    });

}

function ModificarCargo() {

    $.ajax({
        url: url,
        data: retornarDatosCArgo("ModificarCargo"),
        type: 'POST',
        dataType: 'json'

    }).done(function(response) {

        if (response == "ok") {
            // alert("Datos guardado con exito");
            alertas("!Exito!", "Datos modificados con exito", "success");
            //document.getElementById("tablaC").style.display = "none";
            ConsultarTablaCargo();


        } else {
            alertas("!Error!", response, "error");
            //alert(response);

        }
        //limpiar();

    }).fail(function(response) {
        console.log(response);

    });

}

function Eliminar(idPersona) {
    $.ajax({
        url: url,
        data: { "idPersona": idPersona, "accion": "ELIMINAR" },
        type: 'POST',
        dataType: 'json'

    }).done(function(response) {
        if (response == "ok") {
            alertas("!Exito!", "Datos eliminados con exito", "success");
            destruir_tabla();
            Consultar();

            // alert("Datos guardado con exito");

        } else {
            alert(response);
            alertas("!Error!", response, "error");
            //alertas("!Exito!","Datos eliminados con exito","succes");

        }

    }).fail(function(response) {
        alertas("!Error!", response, "error");
        console.log(response);

    });



}

function Validar() {
    id = document.getElementById('id').value;
    cedula = document.getElementById('cedula').value;
    nombre = document.getElementById('nombre').value;
    apellido = document.getElementById('apellido').value;
    direccion = document.getElementById('direccion').value;
    telefono = document.getElementById('telefono').value;
    correo = document.getElementById('correo').value;
    cargo = document.getElementById('cargo').value;


    if (nombre == "" || cedula == "") {
        return false;

    }
    return true

}

function retornarDatos(accion) {

    return {
        "idPersona": document.getElementById('idPersona').value,
        "cedula": document.getElementById('cedula').value,
        "nombres": document.getElementById('nombre').value,
        "apellidos": document.getElementById('apellido').value,
        "sexo": document.getElementById('sexo').value,
        "telefono": document.getElementById('telefono').value,
        "correo_personal": document.getElementById('correo').value,
        "fecha_nacimiento": document.getElementById('fechaN').value,
        "correo_empresarial": document.getElementById('correo_empresarial').value,
        "fechaI": document.getElementById('fechaI').value,
        "regional": document.getElementById('regional').value,
        "centro_operacion": document.getElementById('centro_operacion').value,
        "cargo": document.getElementById('cargo').value,
        "area": document.getElementById('area').value,
        "fechaR": document.getElementById('fechaR').value,
        //"dCargo":document.getElementById('dCargo').value,     
        "accion": accion,
        "idPersona": idPersona = document.getElementById("idPersona").value


    };



}



function retornarDatosPersona(accion) {

    return {
        "idPersona": document.getElementById('idPersona').value,
        "cedula": document.getElementById('cedulaM').value,
        "nombre": document.getElementById('nombreM').value,
        "apellido": document.getElementById('apellidoM').value,
        "telefono": document.getElementById('telefonoM').value,
        "correo_personal": document.getElementById('correoM').value,
        "correo_empresarial": document.getElementById('correoEm').value,
        "centro_operacion": document.getElementById("centro_operacionM").value,
        "area": document.getElementById("area").value,
        "cargo": document.getElementById('cargo').value,
        "regionalM": document.getElementById('regional').value,



        //"dCargo":document.getElementById('dCargo').value,     
        "accion": accion,
        //"idPersona": idPersona = document.getElementById("idPersona").value


    };



}

function retornarDatosCArgo(accion) {

    return {

        "dCargoM": document.getElementById('dCargoM').value,
        "dCargo": document.getElementById('dCargo').value,
        "idCargo": document.getElementById('idCargo').value,
        "idCargoM": document.getElementById('idCargoM').value,
        "accion": accion


    };



}

function limpiar() {


    document.getElementById('idPersona').value = "";
    document.getElementById('cedula').value = "";
    document.getElementById('nombre').value = "";
    document.getElementById('apellido').value = "";
    document.getElementById('sexo').value = "Seleccione su genero";
    document.getElementById('telefono').value = "";
    document.getElementById('correo').value = "";
    document.getElementById('fechaN').value = "";
    document.getElementById('correo_empresarial').value = "";
    document.getElementById('fechaI').value = "";
    document.getElementById('regional').value = "Regional";
    document.getElementById('centro_operacion').value = "Seleccione Centro de operaciones";
    document.getElementById('cargo').value = "Seleccione Cargo actual";
    document.getElementById('area').value = "Seleccione area de trabajo";
    document.getElementById('fechaR').value = $("#fechaR").val(today);


    //BloquearBotones(true);



}

/* function BloquearBotones(guardar){
    if(guardar)
    {

        document.getElementById('guardar').disabled=false;
        document.getElementById('modificar').disabled=true;
    }

    else{
        document.getElementById('guardar').disabled=true;
        document.getElementById('modificar').disabled=false;

    }
} */


function alertas(titulo, descripcion, tipoAlerta) {
    Swal.fire(
        titulo,
        descripcion,
        tipoAlerta


    );

}


function destruir_tabla() {


    $('#tablaPersona').DataTable().destroy();
    $('#tablaCargos').DataTable().destroy();

}

function ocultar() {

    document.getElementById("tablaC").style.display = "block";
    //document.getElementById("tablaC").style.display = "none";
}


function ocultarCargo() {



    valor = document.getElementById('tipoP').value;

    if (valor >= 2 && valor <= 3) {



        document.getElementById("divCargo").style.display = "block";


        //alert("valor"+valor);



    } else {

        document.getElementById("divCargo").style.display = "none";


    }








    //document.getElementById("tablaC").style.display = "none";
}


function ocultarTabla() {


    $('#tablaPersona').show();



    //alert("valor"+valor);





    //document.getElementById("tablaC").style.display = "none";
}


function excel() {

    $('#tablaPersona').DataTable({
        dom: "Bfrtip",
        buttons: {
            dom: {
                buttons: {
                    className: 'btn'
                }
            },
            buttons: [{
                extend: "tablaPersona",
                text: 'Exportar a excel',
                className: 'btn btn-success',
                excelStyles: {
                    template: 'header_blue'
                }
            }]
        }
    });
}


function excel2() {

    $('#tablaPersona').DataTable({
        dom: 'Bfrtip',
        "scrollX": true,
        "scrollCollapse": true,

        //"iDisplayLength": 15,
        //"lengthMenu": [[10, 25, 50, -1], [10, 25, 50, "All"]],



        buttons: [{
                extend: 'excel',
                text: '<i class="fas fa-file-excel"></i>',
                titleAttr: 'persona',
                className: 'btn btn-success',
                exportOptions: {
                    columns: [0, 1, 2, 3, 4, 5, 6, 7]
                }
            },
            {
                extend: 'pdf',
                text: 'pdf',
                titleAttr: 'persona',
                className: 'btn btn-danger',
                exportOptions: {
                    columns: [0, 1, 2, 3, 4, 5, 6, 7]
                }

            },
        ]

    });

}


function excel3() {

    $('#tablaPersona').DataTable({
        dom: 'Bfrtip',

        buttons: {
            dom: {
                button: {
                    className: 'btn'
                }

            },
            buttons: [{
                    extend: 'excel',
                    text: 'excel',
                    titleAttr: 'persona',
                    className: 'btn btn-outline-success'
                },

            ]
        }
    });

}

function fechaActual() {

    var now = new Date();

    var day = ("0" + now.getDate()).slice(-2);
    var month = ("0" + (now.getMonth() + 1)).slice(-2);

    var today = now.getFullYear() + "-" + (month) + "-" + (day);
    $("#fecha").val(today);
    $("#fechaR").val(today);



}

function entradaTabla() {

    $('#tablaPersona').dataTable({
        "iDisplayLength": 50
    });
}

function enviar_mail(nombre) {
    nombres = document.getElementById('nombre').value;
    apellido = document.getElementById('apellido').value;
    cedula = document.getElementById('cedula').value;
    co = document.getElementById('centro_operacion').selected;
    var nombre = "Se ha registrado un nuevo funcionario" + '<br>' + " Nombre: " + nombres + '<br>' + " Apellido: " + apellido + '<br>' + "Cedula: " + cedula + '<br>' + "CO: " + co;
    $.ajax({
        url: url,
        data: { "nombre": nombre, "accion": "ENVIAR_MAIL" },
        type: "POST",
    }).done(function(response) {

        if (response == "Mensaje enviado") {

            //alertas("!Advertencia!", "El usuario Ya existe", "error");
            console.log(response);


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




function enviar_mailM(nombre) {



    nombres = document.getElementById('nombreM').value;
    apellido = document.getElementById('apellidoM').value;
    cedula = document.getElementById('cedulaM').value;
    co = document.getElementById('centro_operacionM').selected;
    var nombre = "Se ha realizado la siguiente modificacion" + '<br>' + " Nombre: " + nombres + '<br>' + " Apellido: " + apellido + '<br>' + "Cedula: " + cedula + '<br>' + "CO: " + co;

    $.ajax({
        url: url,
        data: { "nombreM": nombre, "accion": "ENVIAR_MAILM" },
        type: "POST",
    }).done(function(response) {

        if (response == "Mensaje enviado") {

            alertas("!Advertencia!", "El usuario Ya existe", "error");
            console.log(response);


        } else {

            //alertas("!Advertencia!", "hola fallo", "error");

        }

        console.log(response);
        //alert(response);



    }).fail(function(response) {
        //alert("Algo salió mal");
        console.log(response);
    });

}

function cerrar_sesion() {

    $.ajax({
        url: url,
        data: { "accion": "Cerrar_sesion" },
        type: "POST",
    }).done(function(response) {

        window.location = 'index.html';

        console.log(response);
        //alert(response);



    }).fail(function(response) {
        //alert("Algo salió mal");
        console.log(response);
        window.location = 'index.html';
    });
    window.location = 'index.html';

}