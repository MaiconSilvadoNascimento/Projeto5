const express = require('express')
const exphbs = require('express-handlebars')
const mysql = require('mysql')

const app = express()

app.engine('handlebars', exphbs.engine())
app.set('view engine', 'handlebars')

app.use(
  express.urlencoded({
    extended: true,
  }),
)

app.use(express.json())

app.use(express.static('public'))

app.get('/', function (req, res) {
  res.render('home')
})

//CREATE

app.post('/carros/insertcarro', function (req, res) {
  const modelo = req.body.title
  const placa = req.body.placa
  const km = req.body.km

  const query = `INSERT INTO carros (modelo, placa, km) VALUES ('${modelo}', '${placa}', '${km}')`

  conn.query(query, function (err) {
    if (err) {
      console.log(err)
    }

    res.redirect('/carros')
  })
})

//READ

app.get('/carros', function (req, res) {
  let query = 'SELECT * FROM carros'

  if (req.query.q) {
    const modelo = req.query.q
    query = `SELECT * FROM carros WHERE modelo LIKE '%${modelo}%'`
  }

  conn.query(query, function (err, data) {
    if (err) {
      console.log(err)
    }

    const carros = data

    console.log(data)

    res.render('carros', { carros })
  })
})



app.get('/carros/:id', function (req, res) {
  const id = req.params.id

  const query = `SELECT * FROM carros WHERE id = ${id}`

  conn.query(query, function (err, data) {
    if (err) {
      console.log(err)
    }

    const carro = data[0]

    console.log(data[0])

    res.render('carro', { carro })
  })
})

app.get('/carros/edit/:id', function (req, res) {
  const id = req.params.id

  const query = `SELECT * FROM carros WHERE id = ${id}`

  conn.query(query, function (err, data) {
    if (err) {
      console.log(err)
    }

    const carro = data[0]

    console.log(data[0])

    res.render('editcarro', { carro })
  })
})



//UPDATE

app.post('/carros/editcarro', (req, res) => {
  const id = req.body.id;
  const km = req.body.km;


  console.log(id, km);
  
  const query = `UPDATE carros SET km = '${km}' WHERE id = ${id}`

  conn.query(query, function (err) {
    if (err) {
      console.log(err);
    }

    res.redirect('/carros');
  })
})



app.post('/carros/remove/:id', function (req, res) {
  const id = req.params.id

  const sql = `DELETE FROM carros WHERE id = ${id}`

  conn.query(sql, function (err) {
    if (err) {
      console.log(err)
    }

    res.redirect(`/carros`)
  })
})





const conn = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  port: '3308',
  password: '',
  database: 'locadora_carros',
})

conn.connect(function (err) {
  if (err) {
    console.log(err)
  }

  console.log('Connected to MySQL!')

  app.listen(3000)
})
