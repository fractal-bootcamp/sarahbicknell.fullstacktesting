import express, { Application, Request, Response, NextFunction } from "express";

import { router as userRoutes } from "./routes/user.routes";
import client from "./lib/client";
import { PrismaClientValidationError } from "@prisma/client/runtime/library";

const app: Application = express();

app.use(express.json())

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

app.put('/movies/:movieId/favorite', async (req, res) => {
    const movieId = req.params.movieId
    const userId = req.body.userId

    //1.check if movie is already favored by querying the db
    const favorite = await client.favorite.findFirst({
        where: {
            movieId: movieId, 
            userId: userId
        }
    })
    if (favorite !== null) {
        const deleteFav = await client.favorite.delete({
            where: {
                movieId_userId: {
                    movieId,
                    userId
                }
            }
        })
        return res.json("Favorite Deleted!")
    } else {
        const newFav = await client.favorite.create({
            data: {
                movieId: movieId, 
                userId: userId
            }
        })

        res.json(newFav)
    }
})


export default app;