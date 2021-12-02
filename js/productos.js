var url = "./../controlador/productos_controlador.php"
$(document).ready(function() {

    $("#ean").val("N/A");
    $("#lote").val("N/A");
    fechaActual();

    ConsultarCategoriaP();
    ConsultarTablaFabricante();
    ConsultarFabricanteP();
    ConsultarTablaCategoriaP();








    // $('.fabricante').selectpicker();
    //$('select').selectpicker();
    // $('.my-select').selectpicker();

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

function serial() {

    var t = $('#tablaProducto').DataTable({
        "columnDefs": [{
            "searchable": false,
            "orderable": false,
            "targets": 0,


        }],
        "order": [
            [1, 'asc']
        ]

    });

    t.on('order.dt search.dt', function() {
        t.column(0, { search: 'applied', order: 'applied' }).nodes().each(function(cell, i) {
            cell.innerHTML = i + 1;
            //t.cell(cell).invalidate('dom');
        });
    }).draw();
    //destruir_tabla();

}




function Consultar(categoriaP) {
    //destruir_tabla();
    categoriaP = document.getElementById("categoriaP").value;

    $.ajax({
        data: { "categoriaP": categoriaP, "accion": "CONSULTAR" },
        // data:{"accion":"CONSULTAR2"},
        url: url,
        type: 'POST',
        dataType: 'json'


    }).done(function(response) {
        var html = "";


        if (response == "mal") {

            alertas("!Advertencia!", "Debe seleccionar una categoria", "error");

        } else {
            destruir_tabla();


            $.each(response, function(index, data) {




                html += "<tr>";
                html += "<td> </td>";
                html += "<td>" + data.id_inventario + "</td>";
                html += "<td>" + data.id_producto + "</td>";
                html += "<td>" + data.codigo_producto + "</td>";
                html += "<td>" + data.ean + "</td>";
                html += "<td>" + data.descripcion + "</td>";
                html += "<td>" + data.lote + "</td>";
                html += "<td>" + data.cantidad + "</td>";
                html += "<td>" + data.precio_producto + "</td>";
                html += "<td>" + data.cantidad * data.precio_producto + "</td>";
                html += "<td>" + data.costo + "</td>";
                html += "<td>" + data.categoria + "</td>";
                html += "<td>" + data.fecha_v + "</td>";

                html += "<td>";
                html += "<button class='btn btn-warning' data-bs-toggle='modal' data-bs-target='#modalMproducto' onclick='ConsultarPorId(" + data.id_producto + ");'><span class='fa fa-edit'></span>Modificar</button>"
                    //html += "<button class='btn btn-danger text-white'  onclick='Eliminar("+data.id_persona+");'><span class='fa fa-trash'></span>Eliminar</button>" //data, llama la variable desde la bd
                    // html+="<button class='btn btn-warning'onclick='ConsultarPorId'("+data.idPersona+");><span class='fa fa-edit'></span>Modificar</button>";
                    // html+="<button class='btn btn-warning'onclick='ConsultarPorId'("+data.idPersona+");><span class='fa fa-edit'></span>Modificar</button>";
                html += "</td>";
                html += "</tr>";






            });


            document.getElementById("datosP").innerHTML = html;

            excel2();


        }
    }).fail(function(response) {

        console.log(response);
        //alert("hola"+roles+rol+nota1);

    });

}

function ConsultarTablaFabricante() {
    $.ajax({
        url: url,
        data: { "accion": "ConsultarFabricanteP" },
        type: 'POST',
        dataType: 'json'
    }).done(function(response) {
        //html="<option selected>Seleccione Cargo</option>";
        var html = "";


        $.each(response, function(index, data) {

            html += "<tr>";
            html += "<td>" + data.id + "</td>";
            html += "<td>" + data.descripcion + "</td>";

            html += "<td>";
            //html += "<button class='btn btn-warning'  onclick='ConsultarPorIdCargo("+data.id_cargo+");'><span class='fa fa-edit'></span>Modificar</button>"
            html += " <button type='button'  class='btn btn-primary' data-bs-toggle='modal' data-bs-target='#exampleModal' onclick='ConsultarPorIdFabricante(" + data.id + ");'><span class='fa fa-edit'></span>Modificar</button>";
            // html+="<button class='btn btn-warning'onclick='ConsultarPorId'("+data.idPersona+");><span class='fa fa-edit'></span>Modificar</button>";
            html += "</td>";
            html += "</tr>";

            //<button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">Launch demo modal</button>


        });
        document.getElementById("tablaFabricante").innerHTML = html;
        //excel2();

    }).fail(function(response) {
        console.log(response);
    });

}


function ConsultarTablaCategoriaP() {
    $.ajax({
        url: url,
        data: { "accion": "ConsultarCategoriaP" },
        type: 'POST',
        dataType: 'json'
    }).done(function(response) {
        //html="<option selected>Seleccione Cargo</option>";
        var html = "";


        $.each(response, function(index, data) {

            html += "<tr>";
            html += "<td>" + data.id_categoria_producto + "</td>";
            html += "<td>" + data.categoria + "</td>";

            html += "<td>";
            //html += "<button class='btn btn-warning'  onclick='ConsultarPorIdCargo("+data.id_cargo+");'><span class='fa fa-edit'></span>Modificar</button>"
            html += " <button type='button'  class='btn btn-primary' data-bs-toggle='modal' data-bs-target='#exampleModal' onclick='ConsultarPorIdCategoriaP(" + data.id_categoria_producto + ");'><span class='fa fa-edit'></span>Modificar</button>";
            // html+="<button class='btn btn-warning'onclick='ConsultarPorId'("+data.idPersona+");><span class='fa fa-edit'></span>Modificar</button>";
            html += "</td>";
            html += "</tr>";

            //<button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">Launch demo modal</button>


        });
        document.getElementById("datosCategoriaP").innerHTML = html;
        //excel2();

    }).fail(function(response) {
        console.log(response);
    });

}


function ConsultarPorIdFabricante(idFabricante) {
    $.ajax({
        url: url,
        data: { "idFabricante": idFabricante, "accion": "CONSULTAR_ID_FABRICANTE" },
        type: 'POST',
        dataType: 'json'
    }).done(function(response) {
        //ocultar();

        document.getElementById('idFabricante').value = response.id
        document.getElementById('dFabricanteM').value = response.descripcion


        //BloquearBotones(false);

    }).fail(function(response) {
        console.log(response);
    });

}


function ConsultarPorIdCategoriaP(idCategoriaP) {
    $.ajax({
        url: url,
        data: { "idCategoriaM": idCategoriaP, "accion": "CONSULTAR_ID_CATEGORIAP" },
        type: 'POST',
        dataType: 'json'
    }).done(function(response) {
        //ocultar();

        document.getElementById('idCategoriaM').value = response.id_categoria_producto
        document.getElementById('dCategoriaM').value = response.categoria


        //BloquearBotones(false);

    }).fail(function(response) {
        console.log(response);
    });

}


function ConsultarPorId(idProducto) {
    $.ajax({
        url: url,
        data: { "idProducto": idProducto, "accion": "CONSULTAR_ID" },
        type: 'POST',
        dataType: 'json'
    }).done(function(response) {

        document.getElementById('idProducto').value = response.id_producto;
        document.getElementById('idInventario').value = response.id_inventario;
        document.getElementById('cProducto').value = response.codigo_producto;
        document.getElementById('ean').value = response.ean;
        document.getElementById('descripcionP').value = response.descripcion;
        document.getElementById('fechaV').value = response.fecha_v;
        document.getElementById('lote').value = response.lote;
        document.getElementById('costo').value = response.costo;
        document.getElementById('precio').value = response.precio_producto;


        //BloquearBotones(false);

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

            alertas("!Advertencia!", "El producto Ya existe", "error");
            console.log(data.nombres);


        } else if (response == "ok") {

            // alert("Datos guardado con exito");
            alertas("!Exito!", "Datos guardados con exito", "success");

            limpiar();
            //destruir_tabla();
            //Consultar();

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


function GuardarFabricante() {

    $.ajax({
        url: url,
        data: retornarDatosFabricante("guardarFabricante"),
        type: 'POST',
        dataType: 'json'

    }).done(function(response) {



        if (response == "ok") {

            alertas("!Exito!", "Datos guardados con exito", "success");
            document.getElementById('cFabricante').value = "";
            //limpiar();
            //destruir_tabla();
            ConsultarTablaFabricante();




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


function GuardarCategoriaP() {

    $.ajax({
        url: url,
        data: retornarDatosCategoriaP("guardarCategoriaP"),
        type: 'POST',
        dataType: 'json'

    }).done(function(response) {



        if (response == "ok") {

            alertas("!Exito!", "Datos guardados con exito", "success");
            document.getElementById('cCategoria').value = "";
            //limpiar();
            //destruir_tabla();
            ConsultarTablaCategoriaP();




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


function ModificarFabricante() {

    $.ajax({
        url: url,
        data: retornarDatosFabricante("ModificarFabricante"),
        type: 'POST',
        dataType: 'json'

    }).done(function(response) {

        if (response == "ok") {
            // alert("Datos guardado con exito");
            alertas("!Exito!", "Datos modificados con exito", "success");
            //document.getElementById("tablaC").style.display = "none";

            ConsultarTablaFabricante();


        } else {
            alertas("!Error!", response, "error");
            //alert(response);

        }
        //limpiar();

    }).fail(function(response) {
        console.log(response);

    });

}

function ModificarCategoriaP() {

    $.ajax({
        url: url,
        data: retornarDatosCategoriaP("ModificarCategoriaP"),
        type: 'POST',
        dataType: 'json'

    }).done(function(response) {

        if (response == "ok") {
            // alert("Datos guardado con exito");
            alertas("!Exito!", "Datos modificados con exito", "success");
            //document.getElementById("tablaC").style.display = "none";

            ConsultarTablaCategoriaP();


        } else {
            alertas("!Error!", response, "error");
            //alert(response);

        }
        //limpiar();

    }).fail(function(response) {
        console.log(response);

    });

}



function Modificar() {

    $.ajax({
        url: url,
        data: retornarDatosActualizar("MODIFICAR"),
        type: 'POST',
        dataType: 'json'

    }).done(function(response) {

        if (response == "ok") {
            // alert("Datos guardado con exito");
            alertas("!Exito!", "Datos modificados con exito", "success");

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


function retornarDatos(accion) {

    return {
        "codigoP": document.getElementById('cProducto').value,
        "ean": document.getElementById('ean').value,
        "descripcion": document.getElementById('descripcionP').value,
        "fecha_creacion_producto": document.getElementById('fechaV').value,
        "lote": document.getElementById('lote').value,
        "id_categoria_producto": document.getElementById('categoriaP').value,
        "costo": document.getElementById('costo').value,
        "id_fabricante": document.getElementById('fabricante').value,
        "precio": document.getElementById('precio').value,
        "fechaV": document.getElementById('fechaV').value,
        "fecha_creacion_producto": document.getElementById('fechaC').value,
        "idProducto": idProducto = document.getElementById("idProducto").value,


        //"dCargo":document.getElementById('dCargo').value,     
        "accion": accion,
        // "idPersona":idPersona = document.getElementById("idPersona").value

    };



}


function retornarDatosFabricante(accion) {

    return {

        "dFabricanteM": document.getElementById('dFabricanteM').value,
        "cFabricante": document.getElementById('cFabricante').value,
        "idFabricante": document.getElementById('idFabricante').value,
        "accion": accion


    };



}



function retornarDatosCategoriaP(accion) {

    return {

        "dCategoriaM": document.getElementById('dCategoriaM').value,
        "cCategoria": document.getElementById('cCategoria').value,
        "idCategoriaM": document.getElementById('idCategoriaM').value,
        "accion": accion


    };



}



function retornarDatosActualizar(accion) {

    return {
        "codigoP": document.getElementById('cProducto').value,
        "ean": document.getElementById('ean').value,
        "descripcion": document.getElementById('descripcionP').value,
        "fecha_creacion_producto": document.getElementById('fechaV').value,
        "lote": document.getElementById('lote').value,
        "id_categoria_producto": document.getElementById('categoriaP').value,
        "costo": document.getElementById('costo').value,
        "precio": document.getElementById('precio').value,
        "fechaV": document.getElementById('fechaV').value,
        "fecha_creacion_producto": document.getElementById('fechaC').value,
        "idProducto": idProducto = document.getElementById("idProducto").value,
        "idInventario": idInventario = document.getElementById("idInventario").value,

        //"dCargo":document.getElementById('dCargo').value,     
        "accion": accion,
        // "idPersona":idPersona = document.getElementById("idPersona").value

    };



}


function alertas(titulo, descripcion, tipoAlerta) {
    Swal.fire(
        titulo,
        descripcion,
        tipoAlerta

    );

}


function fechaActual() {

    var now = new Date();

    var day = ("0" + now.getDate()).slice(-2);
    var month = ("0" + (now.getMonth() + 1)).slice(-2);

    var today = now.getFullYear() + "-" + (month) + "-" + (day);
    $("#fechaC").val(today);
    $("#fechaV").val(today);



}


function ConsultarCategoriaP() {
    $.ajax({
        url: url,
        data: { "accion": "ConsultarCategoriaP" },
        type: 'POST',
        dataType: 'json'
    }).done(function(response) {

        var html = "";
        html = "<option selected>Seleccione Categoria</option> <option>TODOS</option>";
        //html="<option>TODOS</option>";

        $.each(response, function(index, data) {

            html += "<option value=" + data.id_categoria_producto + ">" + data.categoria + "</option>";


        });
        document.getElementById("categoriaP").innerHTML = html;

    }).fail(function(response) {
        console.log(response);
    });

}


function ConsultarFabricanteP() {
    $.ajax({
        url: url,
        data: { "accion": "ConsultarFabricanteP" },
        type: 'POST',
        dataType: 'json'
    }).done(function(response) {
        //html="<option selected>Seleccione Cargo</option>";
        var html = "";
        html = "<option selected>Seleccione Fabricante</option>";

        if (html == "Seleccione Fabricante") {


        }

        $.each(response, function(index, data) {

            html += "<option value=" + data.id + ">" + data.descripcion + "</option>";


        });
        document.getElementById("fabricante").innerHTML = html;

    }).fail(function(response) {
        console.log(response);
    });

}


function limpiar() {


    document.getElementById('cProducto').value = "";
    document.getElementById('ean').value = "N/A";
    document.getElementById('descripcionP').value = "";
    document.getElementById('lote').value = "N/A";
    document.getElementById('categoriaP').value = "Seleccione Categoria";
    document.getElementById('costo').value = "";
    document.getElementById('fabricante').value = "Seleccione Fabricante";
    document.getElementById('precio').value = "";
    fechaActual();





}


function destruir_tabla() {


    $('#tablaProducto').DataTable().destroy();
    $('#tablaFabricante').DataTable().destroy();


}



function excel2() {



    var t = $('#tablaProducto').DataTable({

        dom: 'Bfrtip',
        //"scrollY":        "700px",
        "scrollX": true,
        "scrollCollapse": true,

        "footerCallback": function(row, data, start, end, display) {
            var api = this.api(),
                data;

            // Remove the formatting to get integer data for summation
            var intVal = function(i) {
                return typeof i === 'string' ?
                    i.replace(/[\$,]/g, '') * 1 :
                    typeof i === 'number' ?
                    i : 0;
            };

            // Total over all pages
            total = api
                .column(9)
                .data()
                .reduce(function(a, b) {
                    return intVal(a) + intVal(b);
                }, 0);

            // Total over this page
            pageTotal = api
                .column(9, { page: 'current' })
                .data()
                .reduce(function(a, b) {
                    return intVal(a) + intVal(b);
                }, 0);

            // Update footer
            $(api.column(9).footer()).html(
                '$' + total,

                document.getElementById('precioF').value = total




                //'$'+pageTotal +' ( $'+ total +' total)'
            );

        },


        "columnDefs": [{
            "searchable": false,
            "orderable": false,
            "targets": 0,
        }],
        "order": [
            [1, 'asc']
        ],






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

    t.on('order.dt search.dt', function() {
        t.column(0, { search: 'applied', order: 'applied' }).nodes().each(function(cell, i) {
            cell.innerHTML = i + 1;
            //t.cell(cell).invalidate('dom');
        });
    }).draw();




}


function suma() {

    $('#tablaProducto').DataTable({
        "footerCallback": function(row, data, start, end, display) {
            var api = this.api(),
                data;

            // Remove the formatting to get integer data for summation
            var intVal = function(i) {
                return typeof i === 'string' ?
                    i.replace(/[\$,]/g, '') * 1 :
                    typeof i === 'number' ?
                    i : 0;
            };

            // Total over all pages
            total = api
                .column(9)
                .data()
                .reduce(function(a, b) {
                    return intVal(a) + intVal(b);
                }, 0);

            // Total over this page
            pageTotal = api
                .column(9, { page: 'current' })
                .data()
                .reduce(function(a, b) {
                    return intVal(a) + intVal(b);
                }, 0);

            // Update footer
            $(api.column(9).footer()).html(
                '$' + pageTotal + ' ( $' + total + ' total)'
            );
        }
    });
}