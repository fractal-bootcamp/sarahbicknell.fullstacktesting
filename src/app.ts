import express, { Application, Request, Response, NextFunction } from "express";

import { router as userRoutes } from "./routes/user.routes";
import client from "./lib/client";

const app: Application = express();

app.use("/users", userRoutes);

app.get('/movies', async (req, res) => {
    if (req.query) {
        const search = req.query.title as string
        const searchMovie = await client.movie.findMany({
            where: {
                title: search 
            }
        })
        res.send(searchMovie)
    } else {
        const movies = await client.movie.findMany()
        res.send(movies)
    }

    

})

app.get('/movies/:id', async (req, res) => {
    const id = req.params.id

    const movie = await client.movie.findUnique({
        where: {
            id: id
        }
    })
    res.send(movie)
})


export default app;