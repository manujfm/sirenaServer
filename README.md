Este proyecto esta hecho puramente con node.

## Sirena App

Este proyecto se basa en la obtencion y busqueda de mails de un usuario despues de logearse.
Es un micro servicio para ser consumido por un cliente, tiene enpoints habilitados para la 
obtencion de datos (teniendo un token de acceso).

## Estructura del proyecto

* **test** Contiene todo los test
* **controles** Contiene los manejadores de sesion ( Login y Authentiocations )
* **models** Contiene las entidades (mongoose models).
* **routing** Contiene el manjador de rutas (enpoints) 

## Iniciar Apliación
   
   * Configurar el archivo db-connection para poder conectarse a mongo 
   * Configurar el archivo jwr para con una clave secreta para la codificacion
   * Correr el comando **npm start** o **node server.js**
   
## Comandos de NPM

A parte de los comandos regulares que trae la aplicacion, se agregan los siguientes: 

 * **lintlog** escribe un el archivo lint_log las correcciones que require ESLINT 
 * **lintfix** arregla las correcciones que require ESLINT
 * **test** correr los test


## Anotaciones

* Se usa [express]() como framework para el servidor, maneja las rutas y su uso con los midelwares
* Para hashear el password [bcrypt]() de los usuarios nuevos
* Para obtener token de acceso [Json Web Token]()
* Manejo de querys con mongo [Mongoose]() que nos provee de un orm
* [Morgan]() para loggear las peticiones de servidor
* [Body Parser]() para parsear el contenido del bbody de los request


## Propuestas de Mejora

* Hacer clases que devuelvan los modelos que mongoose necesita y manejar la consulta y guardado desde ahi
* Implementar web sockets
* Buscar una alternativa a jwt ya que puede ser un poco inseguro
* Remplazar los enpoints getMails, getFilters, por uno solo que se encarge a traves de un meta datos 
saber que clase quiere obtener y los filtros a usar
* Reemplazar saveMails y saveFilters para hacer algo parecido a el punto anterior (puede ser un solo enpoint
 que maneje el salvado/busqueda de los datos)
* Hacer mas test de funcionalidad