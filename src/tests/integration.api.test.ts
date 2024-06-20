import supertest from "supertest";
import client from "../lib/client"
import seed from "../integration.seed";

import app from "../app";

beforeEach(async () => {
    await seed();
})

describe("check environment variables", () => {
    it("should return the expected postgres database url", () => {
      expect(process.env.DATABASE_URL).toBe(
        "postgresql://postgres:postgres@localhost:10010/postgres"
      );
    });
}) 

describe("Our five movie api routes", () => {
    test("Get movies", async () => {
        //make a get request to movies 
        const movieRes = await supertest(app).get('/movies');

        const movies = [
            {
              id: "345897",
              title: "Fakery",
              description: "The phoniest movie ever",
            },
            {
              id: "5645645",
              title: "New Movie",
              description: "I'm new",
            },
            {
              id: "3453453",
              title: "The Craziest Movie Ever",
              description: "super super crazy",
            }
          ]

        expect(movieRes.status).toEqual(200)
        expect(movieRes.body).toEqual(movies)

    })
})