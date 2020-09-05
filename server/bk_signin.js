var express = require('express');
var mysql = require('mysql');
var bodyParser = require('body-parser');
var cors = require('cors');
const { Console } = require('console');

var app = express();
app.use(bodyParser.json());

app.use(cors());
app.options('*', cors()); // preflight OPTIONS; put before other routes

// Conectar con una Base de Datos
var con = mysql.createConnection({
  host: "127.0.0.1",
  user: "root",
  password: "",
  database: "frameworkdb"
});

con.connect(function (err) {
  if (err) throw err;

  app.listen(3005, function(err) {
    if (err) throw err;

    console.log("Programa escuchando en puerto 3005");
  });
});

//////////////////////////////
///////// usuarios /////////
//////////////////////////////

//Validar usuario por email (TODO)
app.post('/signin', function(request, response) {

    //var mailUsuario = request.params.mailUsuario;
    var usuario = request.body;
    if (!usuario.user || !usuario.password) {
      return response.send("El email y password del usuario no puede ser vacio");
    } 
    // Consulta SQL
    con.query("SELECT * FROM usuarios WHERE mailUsuario = ?", [usuario.user], function (err, result) {
      if (err) throw err;
    
      //Validación del usuario
      var loggedIn = false;
      if (result[0].pwUsuario == usuario.password) {
        loggedIn = true;
      };   
      //Devuelvo resultado, redirecciono si está OK sino devuelvo el mensaje
      if (loggedIn) {
        //return response.send("Usuario logeuado");
        return response.redirect('/main');
      } else {
        return response.send("El Usuario o Password son incorrectos");
      }
      //response.send(result); 
    });
  });

app.get('/main', function(request, response) {
  response.redirect('http://localhost:3000/main.html');
});