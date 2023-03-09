
// importar express
var express = require('express');
const mysql = require('mysql');
// importar o handlebars
const exphbs = require('express-handlebars')
// variável para definir o express
var app  = express();
var port = 3000

// configuração handlebars

app.engine('handlebars', exphbs.engine())
app.set('view engine', 'handlebars')



//rotas 
//rota raiz
app.get('/', (req, res) => {
res.render('home', { layout: false })
})
//express url
app.use(
express.urlencoded({
  extended: true
  
}) 
)
//rota para inserir dados
app.post('/unid/insertunid', (req, res) => {
const nome = req.body.nome
const cidade = req.body.cidade
const qtd = req.body.qtd
const id = req.body.id


const sql = `INSERT INTO agencias (nome, cidade, qtd, id) VALUES ('${nome}', '${cidade}','${qtd}', '${id}')`

conn.query(sql, function(err){
  if (err){
      console.log(err)
  }

  res.redirect('/')
})
})
//rota de consulta geral
app.get('/unid', (req, res) => {
const sql = 'SELECT * FROM agencias'

conn.query(sql, function(err, data){
  if(err){
      console.log(err)
      return
  }

  const listar = data
  
  console.log(listar)

  res.render('unid', { layout: false, listar })

})
})

// consulta um registo pelo id (produto.handlebars)
app.get('/unid/:id', (req, res) => {
const id = req.params.id

const sql = `SELECT * FROM agencias WHERE id = '${id}'`

conn.query(sql, function(err, data){
  if(err){
      console.log(err)
      return
  }

  const listarUnid = data[0]
  res.render('agnc', {  layout: false, listarUnid } )

})
})

//rota do buscar
app.get('/busca', (req, res) => {
res.render('busca', { layout: false })
})


//rota busc para exibir o resultado do buscar
app.post('/busc/', (req, res) => {
const id = req.body.cidade
const sql = `SELECT * FROM agencias WHERE cidade = '${id}'`

conn.query(sql, function(err, data){
 if(err){
 console.log(err)
  return
}
 const listar = data
 res.render('busc', {  layout: false, listar} )
 })
})

//pegando para editar registro
app.get('/unid/edit/:id', (req, res) => {

const id = req.params.id

const sql = `SELECT * FROM agencias where id = '${id}'`

conn.query(sql, function(err, data){
  if(err){
      console.log(err)
      return
  }

  const unid = data[0]
  res.render('edit', { layout: false, unid } )

})
})
//rota de edicao do registro com post
app.post('/unid/updateunid', (req, res) => {

  const cidade = req.body.cidade
  const nome = req.body.nome
  const qtd = req.body.qtd  
  const id = req.body.id
  const sql = `UPDATE agencias SET nome = '${nome}', cidade = '${cidade}', qtd = '${qtd}' WHERE id = '${id}'` 

  conn.query(sql, function(err) {
      if(err){
          console.log(err)
          return
      }

      res.redirect('/unid')
  })
})
//rota para deletar um registro
app.get('/unid/remove/:id', (req, res) => {
  const id = req.params.id

  const sql = `DELETE FROM agencias WHERE id = '${id}'`

  conn.query(sql, function(err){
      if(err){
          console.log(err)
          return
      }

      res.redirect('/unid')
  })
})




// conexao banco de dados
const conn = mysql.createConnection({
host: 'localhost',    
port: '3307',
user:'root',
password: '',
database: 'locadora_carros'

})

conn.connect(function(err) {
if(err){
    console.log(err)
}

console.log('Conectado com sucesso!')


})
//configurar o servidor

app.listen(port, () => {
console.log(`App rodando na porta ${port}`)

})







