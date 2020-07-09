var express = require('express');
var mysql = require('mysql');
var bodyParser = require('body-parser');
var cors = require('cors');

var app = express();
app.use(bodyParser.json());

app.options('*', cors()); // include before other routes
app.use(cors());

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
  
    // SELECT a la tabla de productos con WHERE idUsuario
    con.query("SELECT * FROM usuarios WHERE mailUsuario = ? AND pwUsuario = ?", [usuario.user,usuario.password], function (err, result) {
      if (err) throw err;
  
      if (result.length == 0) {
        return response.send("El Usuario o Password son incorrectos");
      } else {
        return response.send("Usuario logueado satisfactoriamente");
      }
      
      // Devuelvo resultado del select
      //response.send(result);
    });
  });