import express from "express"
import mysql2 from "mysql2"

const app = express()

app.use(express.json())

const sql = mysql2.createPool({
    host: "benserverplex.ddns.net",
    user: "aluno_projetos",
    password: "aluno@projeto",
    database: "alunos_filmes03MB"
})

app.get("/", (request, response) => {
    response.json({
        message: "Servidor de Filmes"
    })
})


app.post("/create-movie", (request, response) => {

    const { title, genre, duration, age_rating } = request.body

    const command =
    "INSERT INTO filmes_MuriloZanniArthurFernandes(title, genre, duration, age_rating) VALUES (?, ?, ?, ?)"

    sql.query(command, [title, genre, duration, age_rating], (error) => {

        if(error){
            console.log(error)
            return response.status(500).json({
                message: "Erro ao cadastrar filme."
            })
        }

        response.status(201).json({
            message: "Filme cadastrado com sucesso!"
        })

    })

})


app.get("/all-movies", (request, response) => {

    const command = "SELECT * FROM filmes_MuriloZanniArthurFernandes"

    sql.query(command, (error, data) => {

        if(error){
            console.log(error)
            return response.status(500).json({
                message: "Erro ao buscar filmes."
            })
        }

        response.json(data)

    })

})


app.delete("/delete-movie/:id", (request, response) => {

    const { id } = request.params

    const command = "DELETE FROM filmes_MuriloZanniArthurFernandes WHERE id = ?"

    sql.query(command, [id], (error) => {

        if(error){
            console.log(error)
            return response.status(500).json({
                message: "Erro ao apagar filme."
            })
        }

        response.json({
            message: "Filme apagado com sucesso!"
        })

    })

})


app.put("/update-movie", (request, response) => {

    const { id, title, genre, duration, age_rating } = request.body

    const command =
    `UPDATE filmes_MuriloZanniArthurFernandes
     SET title = ?, genre = ?, duration = ?, age_rating = ?
     WHERE id = ?`

    sql.query(command,
        [title, genre, duration, age_rating, id],
        (error) => {

        if(error){
            console.log(error)
            return response.status(500).json({
                message: "Erro ao atualizar filme."
            })
        }

        response.json({
            message: "Filme atualizado com sucesso!"
        })

    })

})

app.listen(3000, () => {
    console.log("Servidor online")
})