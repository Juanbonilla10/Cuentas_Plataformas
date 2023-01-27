'use strict'

$.ajax({
    dataType: 'json',
    type: "GET",
    url: "http://localhost:4500/api/informes/informesAll"
}).done(function (data) {
    console.log(data.response)
    $("#cuotasPendientes").html(data.response[0])
    $("#montoMensual").html(data.response[1])
}).fail(function () {
    Swal.fire(
        'Algo salio mal',
        `usuario o contraseña no validos`,
        'error'
    )
});