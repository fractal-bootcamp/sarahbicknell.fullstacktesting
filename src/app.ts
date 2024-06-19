import express, { Application, Request, Response, NextFunction } from "express";
import { Prisma, PrismaClient } from "@prisma/client";

import { router as userRoutes } from "./routes/user.routes";

const client = new PrismaClient

const app: Application = express();

app.use("/users", userRoutes);

app.get('/movies', async (req, res) => {
    const fakeMovie = await client.movie.findMany({
        where: {
            id: "345897",
        },
      })
    res.send(fakeMovie)

})

export default app;