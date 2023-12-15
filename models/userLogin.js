const { DataTypes } = require('sequelize');
const sequelize = require('../config/config');

const UserLogin = sequelize.define('User', {
    email: {
        type: DataTypes.STRING,
        allowNull: false
    },
    senha: {
        type: DataTypes.STRING,
        allowNull: false
    }
});

module.exports = UserLogin;