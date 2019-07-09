class searchByIdStructure  {
	// Estructura de datos del searchById.
	// Funcion que toma un json con la estructura de la API de MercadoLibre y
	// devuelve el objeto final que va a devolverse al front-end.
	setData(data)  
	{
		if (this.validateDataSingle(data)) // Valido la información que entra
		{
			const currencyData = data.currencyData;  // Sabemos que viene con la informacion del tipo de moneda
			const descriptionData = data.descriptionData; // La descripción
			const catData = data.categories; // y la categoría.

			let categories = [] 
			 //Itero las categorias  y devuelvo un array con los nombres
		    catData.path_from_root.map((category) => {
		        return(
		          categories = [
		            ...categories,
		            category.name 
		          ]
		        )
		    })

			const response = { // Armo el resto del response
		        author: {
		        	name: 'Nicolas',
		          	lastname: 'Mazitelli'
		        },
		        item: {
		          	id: data.id,
		          	title: data.title,
		          	price: {
		            	currency: data.currency_id,
		            	amount: data.price,
		            	decimals: currencyData.decimal_places
		          	},
		          	picture: data.pictures[0].url,
	              	condition: data.condition == "used" ? "Usado" : "Nuevo",
		          	free_shipping: data.shipping.free_shipping,
		            sold_quantity: data.sold_quantity,
		            description: descriptionData.plain_text,
		            categories: categories
		        }
		    }
		    return response
		}  
	}

	validateDataSingle (data)  {
		// Valido que haya información
		if (typeof data == 'undefined' || data.length == 0)
		{
			throw new Error("No llego informacion")
		}
		// Valido que tenga id
		if ( data.id === undefined ||  data.id === false ) {
			throw new Error("El producto no tiene ID")
		}
		// Valido que tenga título
		if ( data.title === undefined ||  data.title === false ) {
			throw new Error("El producto no tiene titulo")
		}
		console.log('12')
		// Valido que tenga moneda
		if ( data.currency_id === undefined ||  data.currency_id === false ) {
			throw new Error("El producto no tiene tipo de moneda definido")
		}

		// Valido que tenga precio
		if ( data.price === undefined ||  data.price === false ) {
			throw new Error("El producto no tiene precio")
		}

		// Valido que tenga información del tipo de moneda
		if ( data.currencyData.decimal_places  === undefined ||  data.currencyData.decimal_places  === false ) {
			throw new Error("El producto no tiene informacion de los decimales tipo de moneda")
		}
		// Valido que tenga imágenes
		if ( data.pictures  === undefined ||  data.pictures  === false ) {
			throw new Error("El producto no tiene imagenes")
		}
		// Valido que tenga la condición del producto

		if ( data.condition  === undefined ||  data.condition  === false ) {
			throw new Error("El producto no tiene informacion de la condicion del producto")
		}
		// Valido que tenga información de los medios de envío
		if ( data.shipping  === undefined ||  data.shipping  === false ) {
			throw new Error("El producto no tiene informacion del envio")
		}
		// Valido que tenga información sobre la cantidad vendida
		if ( data.sold_quantity  === undefined ||  data.sold_quantity  === false ) {
			throw new Error("El producto no tiene informacion sobre las ventas")
		}
		// Valido que tenga la descripción
		if ( data.descriptionData  === undefined ||  data.descriptionData  === false ) {
			throw new Error("El producto no tiene informacion sobre la descripcion")
		}
		// Valido que tenga las categorias
		if ( data.categories  === undefined ||  data.categories  === false ) {
			throw new Error("El producto no tiene informacion sobre las categorias")
		}

		return true;
	}
}

module.exports = searchByIdStructure;