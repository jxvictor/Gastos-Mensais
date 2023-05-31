const Sequelize = require('sequelize');
const db = require('../data/database');

const Gasto = db.define('gasto', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    nome: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    data: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    valor: {
        type: Sequelize.DOUBLE,
        allowNull: false
    }
});

module.exports = Gasto;