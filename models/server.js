const express = require('express');
const cors = require('cors');

const { connectDatabase } = require('../databases/config');

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT;
    this.usuariosPath = '/api/usuarios';
    this.authPath = '/api/auth';
    this.agradecimientosPath = '/api/agradecimientos';

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
