'use strict'

function validacionUser(){

    let dato = JSON.parse(sessionStorage.getItem('user'))

    if(dato){
        $(".usuarioName").html(dato.nombre)
        $(".perfil").html(dato.perfil)
        if(dato.perfil!="Administrador"){
            console.log("Entro")
            $(".remisionCuota").css("display","none")
            $("#accion").css("display","none")
        }
    }else{
        location.href ="auth-normal-sign-in.html";
    }


}

$(".ti-layout-sidebar-left").click(()=>{
    location.href ="auth-normal-sign-in.html";
})



validacionUser()

