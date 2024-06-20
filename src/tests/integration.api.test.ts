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

describe("Get movies", () => {
    test("Get all movies", async () => {
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

describe("Get movies by id", () => {
    test("get the movie by id", async () => {
          const movieIdRes = await supertest(app).get('/movies/345897')
          const fakeMovie = {
            id: "345897",
            title: "Fakery",
            description: "The phoniest movie ever",
          }

          expect(movieIdRes.status).toEqual(200)
          expect(movieIdRes.body).toEqual(fakeMovie)
  })
})


describe("Favorite movies", () => {
  test("first time user favs, return 200 and favorite movie", async () => {
      const favoriteRes = await supertest(app)
        .put('/movies/3453453/favorite')
        .set({"content-type": "application/json"})
        .send({
          userId: "6790"
        })

      const favorite = {
        movieId: "3453453",
        userId: "6790"
      }
      
        expect(favoriteRes.status).toEqual(200)
        expect(favoriteRes.body).toEqual(favorite)
  })

  test("second time user favs, return 200 and delete movie", async () => {
    const favorite = () => supertest(app)
    .put('/movies/3453453/favorite')
    .set({"content-type": "application/json"})
    .send({
      userId: "6790"
    })

    await favorite()
    const favoriteRes = await favorite()

    const deletedMessage = "Favorite Deleted!"
    
      expect(favoriteRes.status).toEqual(200)
      expect(favoriteRes.body).toEqual(deletedMessage)
})
  test("Third time user favs the book, return 200 and favorite movie", async () => {
    const favorite = () => supertest(app)
      .put('/movies/3453453/favorite')
      .set({"content-type": "application/json"})
      .send({
        userId: "6790"
      })

      await favorite()
      await favorite()
      const favoriteRes = await favorite()

    const expectedFavorite = {
      movieId: "3453453",
      userId: "6790"
    }
    
      expect(favoriteRes.status).toEqual(200)
      expect(favoriteRes.body).toEqual(expectedFavorite)
})
})