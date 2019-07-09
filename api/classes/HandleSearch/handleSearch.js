var async  = require('express-async-await')
var fetch = require('node-fetch')

var searchByQueryStructure = require("../Structures/searchByQueryStructure");
var searchByIdStructure = require("../Structures/searchByIdStructure");


// Clase encargada de realizar los llamados a las API de MercadoLibre y devolverlas normalizadas
class handleSearch {
    constructor() {
        this.BASE_URL = 'https://api.mercadolibre.com'; // URL a la que consultamos
        this.searchByQueryStructure = new searchByQueryStructure(this); // Estructura de la búsqueda por query
        this.searchByIdStructure = new searchByIdStructure(); // Estructura de la búsqueda por ID
    }	

    // Realizar una busqueda 
    // Toma como parametro un URL y devuelve una promesa en formato JSON como resultado.
	async doSearch(url) {
		const result = await fetch(url)
		return await result.json()
	}

	// Búsqueda por query
	//Toma como parametro un objeto req con los parametros del request
	// y devuelve una promesa
	async searchByQuery (req) {
		//si no tiene query, no hago nada
		if ( !req.query.q ){
			throw new Error('No hay query');  //Error handling
		}

		const limit = 4 //declaro limit por si no viene, por defecto es 4
		if ( req.query.limit ){
			const limit = req.query.limit 
		}

		// realizo la busqueda principal 
		const url = `${this.BASE_URL}/sites/MLA/search?q=${req.query.q}&limit=${limit}`
		try {
			//(Dentro de estructuras hacemos otra búsqueda por cada item, así que devuelve una promesa)
			const data = await this.doSearch(url)
			return await this.searchByQueryStructure.setData(data)
		} catch(error) { 
			throw new Error(error);  //Error handling
		} 
	}

	// Búsqueda por ID
	//Toma como parametro un objeto req con los parametros del request
	// y devuelve una estructura de datos.
	async searchById(req) {
		// realizo la busqueda
		const url = `${this.BASE_URL}/items/${req.params.id}`
		console.log(url)

		try {
			const data = await this.doSearch(url)

			// Valido que la información esté como tiene que estar.
			if (data == undefined || !data.currency_id || !data.category_id){
				throw new Error('Ocurrio un error al realizar la busqueda')
			}
			if ( data.error ){
				throw new Error(data.error)
			}

			const productData =  data

			// Realizo la búsqueda de tipo de moneda
			try{
				productData[ 'currencyData' ] = await this.searchCurrency(data.currency_id)
			}catch(error) { 
				throw new Error(error);  //Error handling
			}

			// Realizo la búsqueda de la categoria
			try {
				productData[ 'categories' ] = await this.searchCategories(data.category_id)
			}
			catch(error) { 
				throw new Error(error);  //Error handling
			} 
	
			//Realizo la búsqueda de la descripción
			try {
				productData[ 'descriptionData' ] = await this.searchDescription(data.id)
			}
			catch(error) { 
				throw new Error(error);  //Error handling
			} 

			return this.searchByIdStructure.setData(productData)

			// Y los devuelvo con la estructura deseada
		}
		catch(error) { 
			throw new Error(error);  //Error handling
		} 
	}

	// Función que busca segun el tipo de moneda
	// Recibe un ID y devuelve una promesa
	async searchCurrency(id)  { 
		const urlCurrency = `${this.BASE_URL}/currencies/${id}`
		try {
			return await this.doSearch(urlCurrency)
		} catch(error) { 
			throw new Error('Ocurrio un error al buscar el tipo de moneda');  //Error handling
		}
	}

	// Función que busca la descripción de un producto
	// Recibe un ID y devuelve una promesa
	async searchDescription(id) {
		const urlDescription = `${this.BASE_URL}/items/${id}/description`
		try {
			return await this.doSearch(urlDescription)
		} catch(error) { 
			throw new Error('Ocurrio un error al buscar la descripcion');  //Error handling
		}
	}

	// Función que busca la categoria de un producto según su ID
	// Recibe un ID y devuelve una promesa
	async searchCategories(id){
		const urlCategories = `${this.BASE_URL}/categories/${id}`
		try {
			return await this.doSearch(urlCategories)
		} catch(error) { 
			throw new Error('Ocurrio un error al buscar la categoria');  //Error handling
		} 
	}

}

module.exports = handleSearch;