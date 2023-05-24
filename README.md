# videoApp

Para realizar la ejecucion de los distintos puntos solicitados para la prueba se necesita tener instalado las siguientes tecnologias:

NODE.JS

Correr:
>npm install 

# Endpoints: 
## USUARIOS:
GET: localhost:4000/api/users/
GET: localhost:4000/api/users/${id}
POST: localhost:4000/api/users/
    JSON: {
	"id": 0,
	"name": "a",
	"username": "b",
	"password": "@feaae1"
    }
En el post tener en cuenta enviar el id en 0 para insertar y distinto a 0 para actualizar
PUT: localhost:4000/api/users/
JSON: {
	"id": 1,
    }

## VIDEOS:
GET: localhost:4000/api/videos/
GET: localhost:4000/api/videos/${id}
POST: localhost:4000/api/videos/
    JSON: {
	"id": 0,
	"title": "futbol",
	"description": "esto es un video de futbol",
	"credits": "creditos al futbol",
	"is_public": 1
}
En el post tener en cuenta enviar el id en 0 para insertar y distinto a 0 para actualizar
PUT: localhost:4000/api/videos/
JSON: {
	"id": 1,
    }
