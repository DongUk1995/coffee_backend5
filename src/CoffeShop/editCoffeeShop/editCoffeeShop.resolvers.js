import client from "../../client";
import { protectedResolver } from "../../users.utils";
import { processCategory } from "../CoffeeShop.utils";

export default {
  Mutation: {
    editCoffeeShop: protectedResolver(
      async (
        _,
        { id, name, latitude, longitude, file, category },
        { loggedInuser }
      ) => {
        const shop = await client.coffeeShop.findUnique({
          where: { id },
          include: {
            categories: {
              select: {
                id: true,
              },
            },
          },
        });
        console.log(shop);
        if (!shop) {
          return {
            ok: false,
            error: "Cannot find coffee shop",
          };
        }
        try {
          await client.coffeeShop.update({
            where: {
              id,
            },
            data: {
              name,
              latitude,
              longitude,
              ...(category && {
                categories: {
                  disconnect: shop.categories,
                  connectOrCreate: processCategory(category),
                },
              }),
            },
          });
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
