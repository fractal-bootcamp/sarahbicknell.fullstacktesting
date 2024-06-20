import client from "./lib/client";

const seed = async () => {
  await client.movie.deleteMany({
    where: {},
  });

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
  });
};

export default seed;