// Escrito em node puro.

//import { createServer } from 'node:http'

//const server = createServer((request, response) => {
//    console.log('oi')

//    return response.end()
//})

//server.listen(3332)

// localhost:3332


//Escrito em fastify - biblioteca 

/*protocolo http 
GET (buscar informação),
POST (criar algo no banco)
PUT (para atualizar informações)
DELETE (deletar algo)
PATCH (Atualizar algo espefifico e não todos os dados)
*/

import { fastify } from 'fastify'
import { DatabasePostgres } from './database-postgres.js'

//importando o banco em memória
//import { DatabaseMemory } from './database-memory.js'

const server = fastify ()

//chamando o database
const database = new DatabasePostgres()

//chamando o database
//const database = new DatabaseMemory()

//criando a rota
//criando os dados com o request body : sempre usar quando for post e put
server.post('/videos', async (request, reply) => {

    const {title, description, duration} = request.body

    await database.create ({
        title,
        description,
        duration
    })

    return reply.status(201).send()
})
//rotas do get 
server.get('/videos', async (request) => {
    
    const search = request.query.search

    const videos = await database.list(search)

    return videos
})
//router parameter - utiliza o ID para saber qual video será editado
server.put('/videos/:id', async (request, reply) => {
    const videoId = request.params.id
    const {title, description, duration} = request.body

    await database.update(videoId, {
        title,
        description,
        duration
    })

    return reply.status(204).send()

})
//Deletando as informações do banco
server.delete('/videos/:id', async (request, reply) => {
    const videoId = request.params.id

    await database.delete(videoId)

    return reply.status(204).send()
})

//utilizando a porta local 
//server.listen({
//    port: 3332,
//})

//configurando a porta e rota de acesso
server.listen({
    host: '0.0.0.0',
    port: process.env.PORT ?? 3332,
})