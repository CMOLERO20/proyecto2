const socket = io();
 
// PRoductos


const formAgregarProducto = document.getElementById('formAgregarProducto')
formAgregarProducto.addEventListener('submit', e => {
    e.preventDefault()
    const producto = {
        title: formAgregarProducto[0].value,
        price: formAgregarProducto[1].value,
        thumbnail: formAgregarProducto[2].value
    }
   
    socket.emit('update', producto);
    formAgregarProducto.reset()
})

socket.on('productos', (productos) => {
   
      html = ejs.render('templates/productosTabla',{productos: productos})
      const tablaProductos = document.getElementById('tablaProductos')
      tablaProductos.innerHTML= html
    })


// Mensajes --------------------------------------------------

const inputUsername = document.getElementById('username')
const inputMensaje = document.getElementById('inputMensaje')
const btnEnviar = document.getElementById('btnEnviar')

const formPublicarMensaje = document.getElementById('formPublicarMensaje')
formPublicarMensaje.addEventListener('submit', e => {
    e.preventDefault()

    const mensaje = {
        author: {
            email: inputUsername.value,
            nombre: document.getElementById('firstname').value,
            apellido: document.getElementById('lastname').value,
            edad: document.getElementById('age').value,
            alias: document.getElementById('alias').value,
            avatar: document.getElementById('avatar').value
        },
        text: inputMensaje.value
    }

    socket.emit('nuevoMensaje', mensaje);
    formPublicarMensaje.reset()
    inputMensaje.focus()
})

socket.on('mensajes', mensajesN => {
  console.log(mensajesN)
   const mensajesNsize = JSON.stringify(mensajesN).length
   console.log(mensajesN, mensajesNsize);

 //   const mensajesD = normalizr.denormalize(mensajesN.result, schemaMensajes, mensajesN.entities)

 //   const mensajesDsize = JSON.stringify(mensajesD).length
 //   console.log(mensajesD, mensajesDsize);

 //   const porcentajeC = parseInt((mensajesNsize * 100) / mensajesDsize)
 //   console.log(`Porcentaje de compresión ${porcentajeC}%`)
 //   document.getElementById('compresion-info').innerText = porcentajeC

  //  console.log(mensajesD.mensajes);
  const html = makeHtmlList(mensajesN.mensajes)
   document.getElementById('mensajes').innerHTML = html;
})

function makeHtmlList(mensajes) {
    return mensajes.map(mensaje => {
        return (`
        <div>
            <b style="color:blue;">${mensaje.author.email}</b>
            [<span style="color:brown;">${mensaje.fyh}</span>] :
            <i style="color:green;">${mensaje.text}</i>
            <img width="50" src="${mensaje.author.avatar}" alt=" ">
        </div>
    `)
    }).join(" ");
}


inputUsername.addEventListener('input', () => {
    const hayEmail = inputUsername.value.length
    const hayTexto = inputMensaje.value.length
    inputMensaje.disabled = !hayEmail
    btnEnviar.disabled = !hayEmail || !hayTexto
})

inputMensaje.addEventListener('input', () => {
    const hayTexto = inputMensaje.value.length
    btnEnviar.disabled = !hayTexto
})