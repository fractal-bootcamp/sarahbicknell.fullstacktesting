import client from "./lib/client";

const seed = async () => {
  await client.movie.deleteMany({
    where: {},
  });
  await client.user.deleteMany({
    where: {}
  })

  const users = await client.user.createMany({
    data: [
      {
        id: "4331",
        name: "Dorothy",
      },
      {
        id: "6790",
        name: "Sarah"
      }
    ]
  })

  const movies = await client.movie.createMany({
    data: [
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
    ],
  })

  const favorite = await client.favorite.create({
    data: {
      userId: "4331",
      movieId: "345897"
    }
  })

};

export default seed;