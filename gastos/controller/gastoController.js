const req = require('express/lib/request');
const res = require('express/lib/response');
let database = require('../data/database');

//const { v4: uuidv4 } = require('uuid')

const urlBase = '/gastos';
const Gasto = require('../model/gasto');

module.exports = (router) => {

    router.get(urlBase, async (req, res) => {
        try {
          const gastos = await Gasto.findAll(); // Consulta ao modelo Gasto para obter todos os registros
          res.json(gastos);
        } catch (error) {
          console.error(error);
          res.status(500).json({ error: 'Ocorreu um erro ao acessar os gastos.' });
        }
      });
      

    router.get(urlBase + '/:id', (req, res) =>{
        const id = req.params.id;
        const gasto = database.find(item => item.id == id);
        res.json(gasto);
    })

    /*router.post(urlBase, (req, res) => {
        const newGasto = {
            id: database.length + 1,
            nome: req.body.nome,
            data: req.body.data,
            valor: req.body.valor
        };

        database.push(newGasto);
        //res.status(200).send();
        res.json(newGasto);
    });*/
    router.post(urlBase, async (req, res) => {
        //console.log(req.body);
    
        await Gasto.create(req.body)
        .then(() => {
            return res.json({
                erro: false,
                mensagem: "Gasto cadastrado com sucesso!"
            });
        }).catch(() => {
            return res.status(400).json({
                erro: true,
                mensagem: "Erro: Gasto não cadastrado!"
            });
        });
    
        //res.send("Página cadastrar");
    });

    router.put(urlBase + '/:id', async (req, res) => {
        try {
          const id = req.params.id;
          const { nome, data, valor } = req.body;
      
          const gasto = await Gasto.findByPk(id);
      
          if (!gasto) {
            return res.status(404).json({
              erro: 'Gasto não encontrado.'
            });
          }
      
          gasto.nome = nome;
          gasto.data = data;
          gasto.valor = valor;
      
          await gasto.save();
      
          res.json(gasto);
        } catch (error) {
          console.error(error);
          res.status(500).json({
            erro: 'Ocorreu um erro ao atualizar o gasto.'
          });
        }
      });
      

    router.delete(urlBase + '/:id', async (req, res) => {
        try {
          const id = req.params.id;
      
          await Gasto.destroy({
            where: {
              id: id
            }
          });
      
          res.status(200).json({
            mensagem: 'Gasto excluído com sucesso.'
          });
        } catch (error) {
          console.error(error);
          res.status(500).json({
            erro: 'Ocorreu um erro ao excluir o gasto.'
          });
        }
      });      

};