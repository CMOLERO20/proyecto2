import express from 'express';  
import http from 'http';
import { Server } from 'socket.io';
import path from 'path';

import mensajes from './clases/mensajes.js';    
import productosApi from './clases/productosApi.js';

const app = express();
const server = http.createServer(app);
const io = new Server(server);
// plantillas config

app.set('view engine', 'ejs');

// Socket

io.on('connection', async socket => {

 socket.emit('productos', await productosApi.listarAll());

    socket.on('update', async (producto) => { 
        
         productosApi.guardar(producto);

        io.sockets.emit('productos',  await productosApi.listarAll());
    });

    const mensajesPR = await mensajes.listarAll()
    
   
socket.emit('mensajes', await mensajes.listarAll());

socket.on('nuevoMensaje', async (mensaje) => {
    mensajes.guardar(mensaje);
    console.log('mensaje guardado');
    io.sockets.emit('mensajes', await mensajes.listarAll())
})


})


// ruta index

app.get('/', async (req,res)=>{
   const productos = await productosApi.listarAll()
   console.log(productos)
  res.render('index',{ productos: productos})
})
//configuracion 

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(express.static('public'))

server.listen(8080 , (req,res)=>{
    console.log('Servidor corriendo en puerto 8080')
})