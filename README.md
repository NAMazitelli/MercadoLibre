<h1>MercadoLibre - Test Práctico - Frontend</h1>

<p>El proyecto cuenta con 2 aplicaciones independientes:
	<ul>
		<li>
			/api    ( localhost:9000 )  	<- El servidor  : Se encarga de los request a la API de MercadoLibre
		</li>
		<li>
			/client ( localhost:3000 ) 	<- El front-end : Las vistas y controladores.
		</li>
	</ul>
</p>


<h3>API</h3>
<p>
Es un servidor simple creado con Express en NodeJS 6.
La api tiene 2 servicios principales:
<ul>
	<li>
 		-Servicio de búsqueda por <b>query</b>. ( <i>/api/items?q={query}</i> )
 	</li>
 	<li>
 	 	-Servicio de búsqueda por <b>ID</b>. (<i>/api/items/:id</i>)
 	 </li>
</ul>
<p>
  Dentro de la carpeta classes encontramos nuestra logica dividida en 4 carpetas:
	<ul>
		<li>
  			-handleSearch: Hay una única clase con el mismo nombre, se encarga de realizar las peticiones a la api de MercadoLibre y devolvernos los datos con la estructura correspondiente.
		</li>
		<li>
  			-Routes: Lógica del ruteo. Hay 2 clases: 
  			* Router: Genera rutas con los servicios que le pasemos y los registra en nuestra app.
  			* searchRouter: Clase que desciende de Router y registra los servicios de busqueda requeridos.
  			<i>Utlizé esta lógica de ruteo pensando en la escalabilidad del proyecto.</i>
		</li>
		<li>
			-Structures: Estructuras de los response de la API.
			* searchByIdStructure: Estructura de datos de la búsqueda por ID.
			* searchByQueryStructure: Estructura de datos de la búsqueda por Query.
		</li>
		<li>
			-Tests: Testeo de las rutas de la aplicación.
		</li>
	</ul>

  - <b>Comandos</b>: 
  * npm test para correr los test de ruteo (hechos con mocha y chai).
  * npm start para iniciar la api

</p>
<h3>CLIENTE</h3>
<p>
El cliente esta hecho en ReactJS, con Redux y redux-saga. Cuenta con 3 vistas principales:
<ul>
	<li><b>/</b> : Pantalla inicial, solo tiene la barra de busqueda.</li> 
	<li><b><i>/items/:id</i></b> : Resultados de busqueda.</li>
	<li><b><i>/items?search=:q</i></b> : Vista interna de productos.</li>
</ul>

Todos los componentes tienen su propia carpeta y dentro sus estilos, tests y demas funcionalidades.
En la raiz del mismo tenemos:
<ul>
	<li>
		-components: Componentes presentacionales del sitio. Solo devuelven HTML y manejan el mínimo o nada de lógica.
	</li>
	<li>
		-containers: Componentes contenedores del sitio. Contienen toda la lógica y propiedades que le pasan a los componentes presentacionales. Algunos tienen sus propias funciones sagas, reducers, acciones y selectores.
	</li>
	<li>
		-images: Imagenes de la aplicación.
	</li>
	<li>
		-libs: Librerias de la aplicación. En este caso solo contiene a Bulma, framework que utilizé mayormente para el sistema de columnas.
	</li>
	<li>
		-styles: Estilos globales de la aplicación.
	</li>
	<li>
		-tests: Tests de la configuracion general del store, los inyectores de saga y de reducers.
	</li>
	<li>
		-utils: Tiene utilidades usadas en la aplicación, como requests para manejar los requests a APIS, history para acceder al url del browser, injectReducer y reducerInjectors para inyectar los reductores de los distintos componentes con redux, injectSaga y sagaInjectors para inyectar las funciones Saga de los distintos componentes.
	</li>
	<li>
		-tests: Tests de la configuracion general del store, los inyectores de saga y de reducers.
	</li>
</ul>

- <b>Comandos</b>: 
  * npm test para correr los test de la aplicación(Hechos con jest y enzyme).
  * npm start para iniciar la aplicación.
</p>

