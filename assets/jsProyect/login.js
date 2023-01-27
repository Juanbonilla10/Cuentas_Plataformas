"use strict";

function eliminarSessionStorage(){
  sessionStorage.removeItem('user')
}

$("#login").click(() => {
  let user = {}
  user.username = $("#username").val()
  user.password = $("#passsword").val()

  if (user.username == "") {
    Swal.fire(
      'Datos vacios',
      'no ingreso usuario',
      'warning'
    )
  } else if (user.password == "") {
    Swal.fire(
      'Datos vacios',
      'no ingreso contraseña',
      'warning'
    )
  } else {


    $.ajax({
      dataType: 'json',
      type : "POST",
      data: user,
      url: "http://localhost:4500/api/usuario/validacion"
    }).done(function (data) {
      let userData = {}
      userData.nombre = data.response.nombre
      userData.perfil = data.response.perfil
      console.log(data)
      Swal.fire(
        'Bienvenido',
        `Hola ${user.username}`,
        'success'
      ).then(res=>{
        sessionStorage.setItem('user', JSON.stringify(userData));
        location.href ="index.html";
        console.log("Hola mundo",res)
      }).catch(err=>{
        console.log("Hola mundo juan",err)
      })
    }).fail(function () {
      Swal.fire(
        'Algo salio mal',
        `usuario o contraseña no validos`,
        'error'
      )
    });
  }

})


eliminarSessionStorage()




