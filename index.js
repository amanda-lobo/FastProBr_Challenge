require('dotenv').config();

const express = require('express');
const { Sequelize } = require('sequelize');
const sequelize = require('./config/config');
const app = express();
const userController = require('./controllers/userController')


app.use(express.json());
app.use(userController);

const PORT = process.env.PORT || 3000;

sequelize
  .authenticate()
  .then(() => {
    console.log('Conexão estabelecida com sucesso.');

    sequelize.sync().then(() => {
      console.log('Modelos sincronizados com sucesso.');
    }).catch((error) => {
      console.error('Erro ao sincronizar os modelos:', error);
    });

    app.listen(PORT, () => {
      console.log(`Servidor rodando na porta ${PORT}`);
    });
  })
  .catch(err => {
    console.error('Erro ao conectar com o banco de dados:', err);
  });