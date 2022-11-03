import config from '../config.js'

import ContenedorArchivo from '../contenedores/ContenedorArchivo.js'

const mensajes = new ContenedorArchivo(`${config.fileSystem.path}/mensajes.json`);

export default mensajes 