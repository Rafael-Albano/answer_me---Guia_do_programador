const express = require('express');
var app = express();
const bodyParser = require('body-parser');
const connection = require('./database/database');
const Pergunta = require('./database/Pergunta');
const { Resposta, Op} = require('./database/Resposta');

// USANDO O EJS COMO VIEW ENGINE
app.set('view engine', 'ejs');

app.use(express.static('public'));

//BODY PARSER
// TRADUZ OS DADOS ENVIADOS DO FORMULÁRIO EM UMA ESTRUTURA JS.
app.use(express.urlencoded({ extended: false}));
// PERMITE LEITURA DE DADOS DO FORMULARIO ENVIADOS VIA JSON
app.use(express.json());

const port = 3000;

// CONEXÃO COM O BANCO DE DADOS.
// USANDO PROMISE.
connection
  .authenticate()
  .then(() => console.log("Conexção estabelecida"))
  .catch((erro) => console.log(erro));

  // USANDO ASYN AWAIT.
// try {
//   connection.authenticate();
//   console.log('Connection has been established successfully.');
// } catch (error) {
//   console.error('Unable to connect to the database:', error);
// }

// ROTAS.
app.get('/', (req, res) =>{

  Pergunta.findAll({ raw: true , order: [
    ['id','DESC']
  ]})
    .then((values) => {

      res.render('index',{
        values
      });
    });
  
});

app.get('/perguntar', (req,res) => {

  res.render('perguntar');
});

app.post('/enviar/pergunta', (req,res) => {

  // JEITO CONVENCIONAL.
  // let titulo = req.body.titulo;
  // let descricao = req.body.descricao;

  // USANDO DESTRUCTURING.
  let {titulo, descricao} = req.body;

  if(titulo === "" && descricao === ""){
    throw TypeError("Parametros Inválidos")
  }

  if(titulo === "" && descricao === ""){
    throw TypeError("Parametros Inválidos")

  }

  // SALVANDO DADOS DO FORMULÁRIO NO BANCO DE DADOS.
  Pergunta.create({
    titulo,
    descricao,
  }).then(() => res.redirect('/'));


});

app.get('/pergunta/:id', (req, res) => {
  let { id } = req.params;
 
  Pergunta.findOne({
    where: {
      id
    }
  }).then((value) => {

    if(value == undefined){
      res.redirect('/');
      return;
    }

    Resposta.findAll({
      where: {
        perguntaId: {
          [Op.eq]: id
        }
      }
    }).then((valueRespostas) => {
      res.render('pergunta', { value, valueRespostas });
    })
    
  });
  
});

app.post('/enviar/resposta', (req, res) => {
  let { corpo, perguntaId } = req.body;

  console.log("teste" + perguntaId);
  if(corpo == ""){
    throw TypeError("Valor inválido !");
  
  }

  Resposta.create({
    corpo,
    perguntaId,
  }).then(() => res.redirect('/pergunta/'+perguntaId));

});


app.listen(port, (error) =>{

  if(error){
    console.log(`Erro ao executar o servidor na porta ${port}: ${error}`)
    return;
  }

  console.log(`Servidor Executado com sucesso em http://localhost:${port}`)
});

