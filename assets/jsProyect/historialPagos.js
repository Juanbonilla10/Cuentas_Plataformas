'use strict'


function getDataHisory() {


    $.ajax({
        dataType: 'json',
        type: "GET",
        url: "http://localhost:4500/api/desprendible/listar"
    }).done(function (data) {

        pintarDatosTabla(data.response)
    }).fail(function () {
        Swal.fire(
            'Algo salio mal',
            `usuario o contraseña no validos`,
            'error'
        )
    });
}

function pintarDatosTabla(datos) {
    let session = JSON.parse(sessionStorage.getItem('user'))

    console.log(session)

    let data = ""

    if(session.perfil != "Administrador"){

       

        datos.forEach(element => {

            let banderaColor = `style="background-color: #1ed7b2;"`

            if(element.estado == 'registrado'){
                banderaColor = `style="background-color: #e95d4e;"`
            }
            
            data += `
            <tr ${banderaColor}>
                 <th scope="row">${element.fechaPago}</th>
                 <td>${element.valorPago}</td>
                 <td>${element.comentario}</td>
                 <td>${element.estado}</td>
            </tr>
            `
        });
    }else{
        datos.forEach(element => {

            let banderaColor = `style="background-color: #1ed7b2;"`

            if(element.estado == 'registrado'){
                banderaColor = `style="background-color: #e95d4e;"`
            }

            data += `
            <tr ${banderaColor}>
                 <th scope="row">${element.fechaPago}</th>
                 <td>${element.valorPago}</td>
                 <td>${element.comentario}</td>
                 <td>${element.estado}</td>
                 <td> 
                 
                 <span class="pcoded-micon identificadorBtn" onclick="eliminarRegistro('${element.fechaPago}')" style="background-color: #FC6180;font-size: 15px;
                 padding: 4px;
                 margin-right: 10px;
                 color: #fff;
                 border-radius: 4px;
                 width: 30px;
                 display: inline-block;
                 height: 30px;
                 text-align: center;"><i class="ti-hand-point-down" ></i></span>
    
                 <span class="pcoded-micon identificadorBtn"  onclick="cambiarEstado('${element.fechaPago}')"  style="background-color: #008000;font-size: 15px;
                 padding: 4px;
                 margin-right: 10px;
                 color: #fff;
                 border-radius: 4px;
                 width: 30px;
                 display: inline-block;
                 height: 30px;
                 text-align: center;"><i class="ti-server" ></i></span>
                 </td>
            </tr>
            `
        });
    }



    $("#historial").html(data)

}

function eliminarRegistro(dataE){
    console.log(dataE)

    Swal.fire(
        'Registro',
        `¿Seguro que desea eliminar el registro?`,
        'info'
    ).then(res=>{
        $.ajax({
            dataType: 'json',
            type: "DELETE",
            data: {fechaPago : dataE},
            url: "http://localhost:4500/api/desprendible/delete"
        }).done(function (data) {
            Swal.fire(
                'Exitoso',
                `Registro eliminado con exito`,
                'success'
            ).then(res=>{
                window.location.reload()
            })
        }).fail(function () {
            Swal.fire(
                'Algo salio mal',
                `usuario o contraseña no validos`,
                'error'
            )
        });
    })

   

}

function cambiarEstado(data){
    console.log(data)
    Swal.fire(
        'Registro',
        `¿Seguro que desea actualizar el registro?`,
        'info'
    ).then(res=>{
        $.ajax({
            dataType: 'json',
            type: "PUT",
            data: {fechaPago : data},
            url: "http://localhost:4500/api/desprendible/actualizar"
        }).done(function (data) {
            Swal.fire(
                'Exitoso',
                `Registro actualizado con exito`,
                'success'
            ).then(res=>{
                getDataHisory()
            })
        }).fail(function () {
            Swal.fire(
                'Algo salio mal',
                `Comuniquese con el administrador del sistema`,
                'error'
            )
        });
    })
}

getDataHisory()

