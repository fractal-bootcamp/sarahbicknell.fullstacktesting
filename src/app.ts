import express, { Application, Request, Response, NextFunction } from "express";
import { PrismaClient } from "@prisma/client";

import { router as userRoutes } from "./routes/user.routes";
import client from "./lib/client";

const app: Application = express();

app.use("/users", userRoutes);

app.get('/movies', async (req, res) => {
    const movies = await client.movie.findMany()

    res.send(movies)

})

export default app;