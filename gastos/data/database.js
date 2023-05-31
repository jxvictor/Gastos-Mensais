const Sequelize = require('sequelize');
const sequelize = new Sequelize('mysql://root:123321@localhost:3306/gastos');

sequelize.authenticate().then(function(){
    console.log("Conexão ao banco de dados realizada com sucesso");
}).catch(function(){
    console.log("Erro na conexão ao banco de dados")
});

const Gastos = sequelize.define('gasto', {
    id: {
        type: Sequelize.BIGINT,
        primaryKey: true,
        autoIncrement: true
    },
    nome: {
        type: Sequelize.STRING
    },
    data: {
        type: Sequelize.STRING
    },
    valor: {
        type: Sequelize.DOUBLE
    }
});

Gastos.sync({force: true}).then(() => {
    return Gastos.create({
        id: 1,
        nome: 'Steam',
        data: '28/05/2022',
        valor: 150.00
    });
});

module.exports = sequelize;
