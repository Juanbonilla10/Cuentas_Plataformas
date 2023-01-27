'use strict'

$("#primary-popover-content").click(() => {
  let formulario = {}
  formulario.fecha = $("#fechaPago").val()
  formulario.pago = $("#valorPago").val()
  formulario.comentario = $("#comentarios").val()

  if (formulario.fecha == "") {
    Swal.fire(
      'Algo salio mal',
      `no hay datos de fecha de pago`,
      'info'
    )
  } else if (formulario.pago == "") {
    Swal.fire(
      'Algo salio mal',
      `no hay datos de valor de pago`,
      'info'
    )
  } else if (formulario.comentario == "") {
    Swal.fire(
      'Algo salio mal',
      `no hay datos de comentarios`,
      'info'
    )
  } else {

    $.ajax({
      dataType: 'json',
      type: "GET",
      url: "http://localhost:4500/api/desprendible/listar"
    }).done(function (data) {
      let datosd = data.response
      let bandera = true;
      datosd.forEach(element => {
        if (element.fechaPago == formulario.fecha) {  
          bandera = false; 
          Swal.fire(
            'Fecha duplicada',
            `La fecha de creación ${formulario.fecha} se encuentra creada`,
            'error'
          )
        }
      });
      if(bandera==true){
        crearRemision(formulario)
      }     

    }).fail(function () {
      Swal.fire(
        'Algo salio mal',
        `usuario o contraseña no validos`,
        'error'
      )
    });

  }


})


function crearRemision(formulario) {
  $.ajax({
      dataType: 'json',
      type: "POST",
      data: formulario,
      url: "http://localhost:4500/api/desprendible/guardar"
    }).done(function (data) {
      console.log(data)
      Swal.fire(
        'Registro exitoso',
        `Formulario diligenciado con exito`,
        'success'
      )
    }).fail(function () {
      Swal.fire(
        'Algo salio mal',
        `usuario o contraseña no validos`,
        'error'
      )
    });
}