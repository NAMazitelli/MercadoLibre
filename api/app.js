/* Configuración de Express */
/* Importación las dependencias necesarias */
var createError = require('http-errors'); 	 // Manejo de errores
var express = require('express');		  	 // Importamos Express
var path = require('path');				 	 // Para poder trabajar con nuestros archivos
var cookieParser = require('cookie-parser'); // Manejo de cookies
var logger = require('morgan');				 // Logger 
var cors = require("cors");					 // CORS Para poder acceder desde otros dominios
var searchRouter = require("./classes/Routes/searchRouter"); // rutas de los servicios

// Instanciamos a express
var app = express();

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

// Configuracion de express
app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

var searchRouter = new searchRouter("/", app);

// redireccionar 404 al manejo de errores
app.use(function(req, res, next) {
  next(createError(404));
});

// Manejo de errores
app.use(function(err, req, res, next) {
  // seteo de locales para mostrar errores en ambiente de desarrollo
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // mostrar pagina de error
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
