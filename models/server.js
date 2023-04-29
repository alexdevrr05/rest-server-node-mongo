const express = require('express');
const cors = require('cors');

const { connectDatabase } = require('../databases/config');
const bodyParser = require('body-parser');

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT;
    this.usuariosPath = '/api/usuarios';
    this.mascotasPath = '/api/mascotas';
    this.authPath = '/api/auth';

    this.app.use(bodyParser.urlencoded({ extended: false }));
    this.app.use(bodyParser.json());

    this.conectarDB();
    this.middlewares();
    this.routes();
  }

  async conectarDB() {
    await connectDatabase();
  }

  middlewares() {
    this.app.use(cors());
    this.app.use(express.json());
    this.app.use(express.static('public'));
  }

  routes() {
    this.app.use(this.usuariosPath, require('../routes/usuarios'));
    this.app.use(this.authPath, require('../routes/auth'));
    this.app.use(this.mascotasPath, require('../routes/mascotas'));
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log(`Servidor corriendo en el puerto ${this.port} 🚀`);
    });
  }
}

module.exports = Server;
