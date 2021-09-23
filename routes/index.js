const express = require('express');
const router = express.Router();
const axios = require('axios');

router.get('/temas', async (req, res, next) => {

  try {
    // Consumindo todos os temas de votações da API da câmara e filtrando por nome
    const {
      data
    } = await axios('https://dadosabertos.camara.leg.br/api/v2/referencias/proposicoes/codTema')
    temasNomes = data.dados.map(dados => dados.nome)
    codListaTemas = data.dados.map(dados =>  dados.nome + '  ID: - ' + dados.cod)

    res.status(200).json({
      'Lista de temas': temasNomes,
      'Nome e IDs:' : codListaTemas
    });
  } catch (error) {
    console.error("Algum erro inesperado aconteceu:" + error)
  }
});

// Lista todos os projetos recentes de um determinado tema
router.get('/temas/:id', async (req, res, next) => {

  // Seleciona a data atual e subtrai um mês (AAAA-MM-DD)

  const ano = '2021' // ano que serão filtradas as propostas
  const itens = 40 // quantidade de itens a ser mostrada
  idTema = req.params.id // id do tema, pego na URL

  try {
    // Consumindo as propostas de votação com base no ID do tema
    const {
      data
    } = await axios('https://dadosabertos.camara.leg.br/api/v2/proposicoes?ano=' + ano + '&codTema=' + idTema + '&itens=' + itens + '&ordem=ASC')
    nomesTemas = data.dados.map(dados => dados.ementa)
    siglaEmenta = data.dados.map(dados => dados.siglaTipo)

    res.status(200).json({
      'Nomes das ementas': nomesTemas,
      'Dados completos': data
    });
  } catch (error) {
    console.error("Algum erro inesperado aconteceu:" + error)
  }

});

module.exports = router;