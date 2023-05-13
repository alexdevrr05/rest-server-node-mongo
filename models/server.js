const express = require('express');
const { urlencoded, json } = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const { connectDatabase } = require('../databases/config');

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT;
    this.usuariosPath = '/api/usuarios';
    this.authPath = '/api/auth';
    this.agradecimientosPath = '/api/agradecimientos';
    this.projectsPath = '/api/projects';

    this.conectarDB();
    this.middlewares();
    this.routes();
  }

  async conectarDB() {
    await connectDatabase();
  }

  middlewares() {
    this.app.use(cors());
    // this.app.use(express.json());

    this.app.use(urlencoded({ extended: true }));
    this.app.use(json());

    // this.app.use(express.urlencoded({ extended: true }));

    this.app.use(express.static('public'));
    this.app.use(express.static('uploads'));
  }

  routes() {
    this.app.use(this.usuariosPath, require('../routes/usuarios'));
    this.app.use(this.authPath, require('../routes/auth'));
    this.app.use(this.projectsPath, require('../routes/projects'));
    this.app.use(
      this.agradecimientosPath,
      require('../routes/agradecimientos')
    );
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log(`Servidor corriendo en el puerto ${this.port} 🚀`);
    });
  }
}

module.exports = Server;
