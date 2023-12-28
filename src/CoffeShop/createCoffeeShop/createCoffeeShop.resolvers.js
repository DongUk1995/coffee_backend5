import client from "../../client";
import { protectedResolver } from "../../users.utils";
import { processCategory } from "../CoffeeShop.utils";

export default {
  Mutation: {
    createCoffeeShop: protectedResolver(
      async (
        _,
        { name, latitude, longitude, category, file },
        { loggedInUser }
      ) => {
        try {
          await client.coffeeShop.create({
            data: {
              name,
              latitude,
              longitude,
              user: {
                connect: {
                  id: loggedInUser.id,
                },
              },
              categories: {
                connectOrCreate: processCategory(category),
              },
            },
          });
          let file = null;
          if (file) {
            const { filename, createReadStream } = await file;
            const newFilename = `${Date.now()}-${filename}`;
            const readStream = createReadStream(
              process.cwd() + "/uploads/" + newFilename
            );
            readStream.pipe(writeStream);
            avatarUrl = `http://localhost:4000/static/${newFilename}`;
          }
          return {
            ok: true,
          };
        } catch (error) {
          return {
            ok: false,
            error: `${error}`,
          };
        }
      }
    ),
  },
};
