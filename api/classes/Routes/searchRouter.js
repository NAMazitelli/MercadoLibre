var async  = require('express-async-await')
var handleSearch = require("../HandleSearch/handleSearch")
var Router = require("./Router")

class searchRouter extends Router {
	// Router para los servicios de búsqueda.
	constructor(routePath,app) {
   		super(routePath,app);
       	this.handleSearch = new handleSearch();
    }

	get services() {
		return { 
			'api/items'      : 'searchByQuery',
     		'api/items/:id'  : 'searchById',
        };
	}

	/* Servicios */	

	// Servicio de búsqueda por query.
	// endpoint = localhost:9000/api/items
	// PARAMETROS: 
	// - Query Strings
	// --- q: Término de búsqueda.
	// --- limit: cantidad de elementos a traer, por defecto es 4.

	// RESULTADO:
	// JSON con el resultado de la busqueda en el formato:

	/*----------------------------------------------------
	{
		“author”: {
			“name”: String 							<---  Mi nombre
			“lastname”: String  					<---  Mi apellido
		},
		categories: [String, String, String, ...],  <--- Listado de categorias usado para armar el breadcrumbs
		items: [									<--- Resultados de la busqueda
			{
				"id": String,						<--- Identificador único del item
				"title": String,					<--- Titulo del item
				"price": {							<--- Datos del precio
					"currency": String,				<--- Tipo de moneda
					"amount": Number,				<--- Precio
					"decimals": Number				<--- Numero de decimales
				},									
				“picture”: String,					<--- Foto del producto
				"condition": String,				<--- Condición del producto
				"free_shipping": Boolean			<--- Si tiene envio gratis
			},
			{...},
			{...},
			{...}
		]
	}
	---------------------------------------- */
  	async searchByQuery(req,res,next) {

		try {
	  		const response = await this.handleSearch.searchByQuery(req)
			res.send(response);
		}
		catch(error) { 
			const response = {
				"error" : error.message
			}
			res.send(response) //error handling
		} 
	}

  
	// Servicio de búsqueda por ID.
	// endpoint = /api/items/:id
	// PARAMETROS: 
	// - De URL
	// --- id: Id del producto a buscar.

	// RESULTADO:
	// JSON con el resultado de la busqueda en el formato:

	/*----------------------------------------------------
	{
		“author”: {
			“name”: String 							<---  Mi nombre
			“lastname”: String  					<---  Mi apellido
		},
		“item”: {									
			"id": String,							<--- Id del producto
			"title": String,						<--- Titulo del producto
			"price": {								<--- Datos del precio
				"currency": String,					<--- Tipo de moneda
				"amount": Number,					<--- Precio
				"decimals": Number					<--- Numero de decimales
			},		
			“picture”: String,						<--- Foto del producto
			"condition": String,					<--- Condicion del producto
			"free_shipping": Boolean,				<--- Si tiene Envio Gratis
			"sold_quantity", Number					<--- Cantidad vendida
			"description": Strings 					<--- Descripcion
		}
	}
	---------------------------------------- */
	async searchById(req,res,next) {


		try {
			const response = await this.handleSearch.searchById(req)
			res.send(response);
		}
		catch(error) { 
			const response = {
				"error" : error.message
			}
			res.send(response) //error handling
		} 
	}
 
}

module.exports = searchRouter;