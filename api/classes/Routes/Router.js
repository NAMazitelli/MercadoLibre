"use strict";

class Router {

  // Constructor:
  // - routePath : la ruta de cada servicio (ie. '/auth/users')
  // - app : Hilo principal del servidor
	constructor(routePath,app) {
		if (app == null)
			throw new Error("No se encontro el hilo principal del servidor.");

		this.app = app;
		this.routePath = routePath;
		this._routes = [];
		this.registerServices();
	}
  

  	// Cada subclase debe tener sus propios servicios en forma de diccionario donde:
  	// - La key es el  metodo http + la ruta del servicio.
  	//   ( el método HTTP por defecto es GET )
  	//   (ie. 'POST login/fb/:token')
  	// - El valor es el método al que llama.
  	get services() {
		return {};
	}

  	// Itera una lista de servicios y los registra con la ruta especificada.
	registerServices() {

		var router_services = this.services;
		Object.keys(router_services).forEach( full_path => {
			// Nombre de la función logica
			var service_function = router_services[full_path];
			var path_items = full_path.split(' ');
			// Por defecto es GET.
			var verb = (path_items.length > 1 ? path_items[0] : 'get').toLowerCase();
			var path = this.routePath + (path_items.length > 1 ? path_items[1] : full_path);
			// bindeo el servicio a la lógica de express.			
			this.app[verb](path, this[service_function].bind(this));
		});
	}
}

module.exports = Router;