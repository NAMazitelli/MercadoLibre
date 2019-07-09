var async  = require('express-async-await')

class searchByQueryStructure  {
	// Estructura de datos del searchById.
    // Recibe como parametro al padre para poder realizar la búsqueda del tipo de moneda de cada item.
	constructor(obj){
       	this.handleSearch = obj; 
	}
	// Funcion que toma un json con la estructura de la API de MercadoLibre y
	// devuelve el objeto final que va a devolverse al front-end.
	async setData(data) 
	{
		if (this.validateDataSearch(data)) // Valido la información que entra
		{

			let categories = []
			 //Itero las categorias  y devuelvo un array con los nombres
		    if( data.filters.length > 0 ) {
		        data.filters[0].values[0].path_from_root.map((category) => {
		          return(
		            categories = [
		              ...categories,
		              category.name 
		            ]
		        )
	        })}

		    // Busco la información normalizada de cada item
			let items = await this.fetchDataItems(data.results)

			// Armo el resto del response
		    const response = {
		        author: {
		         	name: 'Nicolas',
			        lastname: 'Mazitelli'
		        },
		        categories: categories,
		        items:items
		    }
			return await response
			
		}  
	} 

	// Estructura de datos de cada item.
	setDataItems(data) {
		if (this.validateDataItems(data)) // Valido la información que entra
		{
			// La devuelvo normalizada
		    const items = 
	        {
	            id: data.id,
	            title: data.title,
	            price: {
	                currency: data.currency_id,
	                amount: data.price,
	                decimals: data.decimal_places
	            },
	            picture: data.thumbnail,
	            condition: data.condition == "used" ? "Usado" : "Nuevo",
	            free_shipping: data.shipping.free_shipping,
	            address: data.address.state_name
	        }
	       	
	   		return items
		}
	} 

	// Función que realiza la búsqueda de la información de cada item
	// y la devuelve normalizada.
	// Recibe un array de resultados y devuelve una promesa.
	async fetchDataItems(data) { 
    	let items = []

    	return await Promise.all(data.map( async item => {
	    	//(Tengo que buscar por cada item el precio solo por los decimales)
			const currencyData = await this.handleSearch.searchCurrency(item.currency_id)
			.catch((error) => { 
				throw new Error(error);  //error handling
			} )

			//si no viene o viene con status, es un error
			if ( !currencyData  || !currencyData.decimal_places )
			{
				throw new Error('Ocurrio un error al realizar la busqueda del tipo de moneda')
			}

			item['decimal_places'] = currencyData.decimal_places // El único dato que me importa del tipo de moneda
			item['thumbnail'] = item.thumbnail.replace(/\-I\./g, '-X.') // Reemplazo la imágen por una mas grande
			return (
		        items = this.setDataItems(item)
			)
		}))

	}

	validateDataItems(data) {
		// Valido que haya información
		if (typeof data == 'undefined' || data.length == 0)
		{
			throw new Error("No llego informacion")
		}
		// Valido que tenga id
		if ( !data.id ) {
			throw new Error("El producto no tiene ID")
		}
		// Valido que tenga título
		if ( !data.title ) {
			throw new Error("El producto no tiene titulo")
		}
		// Valido que tenga moneda
		if ( !data.currency_id ) {
			throw new Error("El producto no tiene tipo de moneda definido")
		}
		// Valido que tenga precio
		if ( !data.price ) {
			throw new Error("El producto no tiene precio")
		}
		// Valido que tenga información del tipo de moneda
		if ( !data.decimal_places ) {
			throw new Error("El producto no tiene informacion de los decimales tipo de moneda")
		}
		// Valido que tenga thumbnail
		if (! data.thumbnail )
		{
			throw new Error("El producto no tiene imagenes")
		}
		// Valido que tenga información de los medios de envío
		if ( !data.shipping ) {
			throw new Error("El producto no tiene informacion del envio")
		}
		// Valido que tenga la condición del producto
		if ( !data.condition ) {
			throw new Error("El producto no tiene informacion de la condicion")
		}
		// Valido que tenga datos de la ubicación
		if ( !data.address.state_name ) {
			throw new Error("El producto no tiene informacion de la ubicacion")
		}
		return true;
	} 

	validateDataSearch (data) {
		// Valido que haya data
		if (typeof data == 'undefined' || data.length == 0)
		{
			throw new Error("No llego informacion")
		}
		return true
	} // validacion de data
}

module.exports = searchByQueryStructure;