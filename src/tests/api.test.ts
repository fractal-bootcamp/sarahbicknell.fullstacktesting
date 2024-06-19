import supertest from "supertest";
import app from "../app";
import { prismaMock } from "./testclient";

const fakeMovies = 
[ {
    id: "345897",
    title: "Fakery",
    description: "The phoniest movie ever"
}]

prismaMock.movie.findMany.mockResolvedValue(fakeMovies)

describe("Our five movie api routes", () => {
    test("Get movies", async () => {
        //make a get request to movies 
        const movieRes = await supertest(app).get("/movies");
        
        //todo: insert some actual data to test
        expect(movieRes.status).toEqual(200)
        expect(movieRes.body).toEqual(fakeMovies)
    

        

        //make a get req to movies with a search query param
        const searchRes = await supertest(app).get("/movies?search=inc")

        //todo insert data 
        expect(searchRes.status).toEqual(200)
        expect(searchRes.body).toEqual(fakeMovies)
        
    })
})