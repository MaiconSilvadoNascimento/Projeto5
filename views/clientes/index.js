const express = require('express');
const exphbs = require('express-handlebars');
const nodemon = require('nodemon');
const mysql = require('mysql');

var app = express();
var port = 3000;

app.engine('handlebars', exphbs.engine());
app.set('view engine', 'handlebars');

app.use(
    express.urlencoded({ 
        extended: true
}));

//rota raiz
app.get('/', function (req, res) {;
    res.render('home', {layout:false})
});

//rota para inserir dados
app.post('/client/insertclient', (req, res) => {
    const nome = req.body.nome
    const cpf = req.body.cpf
    const email = req.body.email
    const tel = req.body.tel
  
    const sql = `INSERT INTO client (nome, cpf, email, tel) VALUES ('${nome}', '${cpf}', '${email}', '${tel}')`
  
    conn.query(sql, function(err){
        if (err){
            console.log(err)
        }
        res.redirect('/')
})});

//rota de consulta
app.get('/client', (req, res) => {
    const sql = 'SELECT * FROM client'

    conn.query(sql, function(err, data){
        if(err){
            console.log(err)
            return
        }
    const listar = data 
    console.log(listar)
    res.render('client', { layout: false, listar })
})});

//consulta um registo pelo id (produto.handlebars)
app.get('/client/:cpf', (req, res) => {
    const cpf = req.params.cpf  
    const sql = `SELECT * FROM client WHERE cpf = ${cpf}`;
    conn.query(sql, function(err, data){
        if(err){
            console.log(err)
            return
        }
        const listarClient = data[0]
        res.render('clientes', {layout: false, listarClient})
    })
});

//rota de busca 
app.get('/busc_client', function(req, res){
    res.render('busc_client', {layout: false})
});

app.post('/busca_client/', (req, res) => {
    const cpf = req.body.cpf
    const nome = req.body.nome
    const sql = `SELECT * FROM client WHERE cpf = ${cpf}`  
    conn.query(sql, function(err, data){
       if(err){
       console.log(err)
        return
      }
       const listarClient = data[0]
       res.render('busca_client', {  layout: false, listarClient } )
    })
});

//pegando para editar o registro
app.get('/client/edit/:cpf', (req, res) => {
    
    const cpf = req.params.cpf

    const sql = `SELECT * FROM client where cpf = ${cpf}`

    conn.query(sql, function(err, data){
        if(err){
            console.log(err)
            return
        }
        const client = data[0]
        res.render('edit_client', { layout: false, client } )
    })
});

//rota de edicao do registro com post
app.post('/client/updateclient', (req, res) => {

    const cpf = req.body.cpf
    const nome = req.body.nome
    const email = req.body.email
    const tel = req.body.tel
    
    const sql = `UPDATE client SET nome = '${nome}', email = '${email}', tel = '${tel}' WHERE cpf = '${cpf}'` 

    conn.query(sql, function(err) {
        if(err){
            console.log(err)
            return
        }
        res.redirect('/client')
    })
});

//pegando para apagar um registro
app.get('/client/remove/:cpf', (req, res) => {
    
    const cpf = req.params.cpf

    const sql = `DELETE FROM client where cpf = ${cpf}`

    conn.query(sql, function(err, data){
        if(err){
            console.log(err)
            return
        }
        res.redirect('/client')
    })
});

//conexao com o banco de dados
const conn = mysql.createConnection({
    host: 'localhost',    
    port: '3307',
    user:'root',
    password: '',
    database: 'locadora'
});

conn.connect(function(err) {
    if(err){
    console.log(err)
}
    console.log('Conectado com sucesso!')   
});

app.use(express.urlencoded({extended: true}));

app.listen(port, () => {
    console.log(`Servidor funcionando na porta ${port}`);
});
