//banco de dados
import { randomUUID } from "node:crypto"
import { sql } from './db.js'

export class DatabasePostgres {

    //listando as informações da API Node do banco de dados.
    async list(search){
        let videos

        if(search){
            videos = await sql`select * from videos where title ilike ${search + '%'}`
        }else{
            videos = await sql`select * from videos`
        }

        return videos 
    }

    //Criando as tabelas no banco.
    async create(video){
        const videoId = randomUUID()

        const {title, description, duration} = video 

        await sql`insert into videos (id, title, description, duration) VALUES (${videoId}, ${title}, ${description}, ${duration})`
    }

    //Atualizando as informações do banco.
    async update(id, video){
        const {title, description, duration} = video 

        await sql`UPDATE videos SET title = ${title}, description = ${description}, duration = ${duration} WHERE id = ${id}`

    }
    
    //Deletando as informações do Banco.
    async delete(id){
        await sql`DELETE FROM videos WHERE id = ${id}`
    }
}