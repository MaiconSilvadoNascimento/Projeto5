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
//rota raiz - funcionário (wesley)
app.get('/', (req, res) => {
  res.render('cadastro_func', { layout: false })
})
//express url
app.use(
  express.urlencoded({
      extended: true
      
}) 
)
//rota para inserir dados funcionário (wesley)
app.post('/func/insertfunc', (req, res) => {
  const nome = req.body.nome
  const cpf = req.body.cpf
  const cargo = req.body.cargo

  const sql = `INSERT INTO funcionario (nome, cpf, cargo) VALUES ('${nome}', '${cpf}', '${cargo}')`

  conn.query(sql, function(err){
      if (err){
          console.log(err)
      }

      res.redirect('/')
  })
})
//rota de consulta geral funcionário (wesley)
app.get('/func', (req, res) => {
  const sql = 'SELECT * FROM funcionario'

  conn.query(sql, function(err, data){
      if(err){
          console.log(err)
          return
      }
  
      const listar = data
      
      console.log(listar)

      res.render('consulta_geral_func', { layout: false, listar })

  })
})

// consulta um registo pelo id - funcionário (wesley)
app.get('/func/:id', (req, res) => {
  const id = req.params.id
  
  const sql = `SELECT * FROM funcionario WHERE id = ${id}`

  conn.query(sql, function(err, data){
      if(err){
          console.log(err)
          return
      }

      const listarProd = data[0]
      res.render('consulta_por_id_func', {  layout: false, listarProd } )

  })
})

//rota do buscar - funcionário (wesley)
app.get('/busca', (req, res) => {
  res.render('busca_func', { layout: false })
})


//rota busc para exibir o resultado do buscar - funcionário (wesley)
app.post('/busc/', (req, res) => {
  const id = req.body.id
  const sql = `SELECT * FROM funcionario WHERE id = ${id}`

  conn.query(sql, function(err, data){
     if(err){
     console.log(err)
      return
    }
     const listarProd = data[0]
     res.render('consulta_por_id_func', {  layout: false, listarProd } )
     })
    })

//pegando para editar registro - funcionário (wesley)
app.get('/func/edit/:id', (req, res) => {
    
  const id = req.params.id

  const sql = `SELECT * FROM funcionario where id = ${id}`

  conn.query(sql, function(err, data){
      if(err){
          console.log(err)
          return
      }

      const prod = data[0]
      res.render('edit_func', { layout: false, prod } )

  })
})

//rota de edicao do registro com post - funcionário (wesley)
app.post('/func/updatefunc', (req, res) => {

  const id = req.body.id
  const nome = req.body.nome
  const cpf = req.body.cpf
  const cargo = req.body.cargo
  
  const sql = `UPDATE funcionario SET nome = '${nome}', cpf = '${cpf}', cargo = '${cargo}' WHERE id = '${id}'` 

  conn.query(sql, function(err) {
      if(err){
          console.log(err)
          return
      }

      res.redirect('/func')
  })

})

//rota para deletar um registro - funcionário (wesley)
app.get('/func/remove/:id', (req, res) => {
  const id = req.params.id

  const sql = `DELETE FROM funcionario WHERE id = ${id}`

  conn.query(sql, function(err, data){
      if(err){
          console.log(err)
          return
      }

      res.redirect('/func')
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
