var express = require('express');
var mysql = require('mysql');
var bodyParser = require('body-parser');
var cors = require('cors');
const { Console } = require('console');
const { isNull, isUndefined } = require('util');
const { endianness } = require('os');

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

          //Existe el usuario
          if (result.length > 0){
            
            //El password está OK?
            if (result[0].pwUsuario == usuario.password) {
              loggedIn = true;
             };  

          };
          response.send(loggedIn); 
    });
  });
