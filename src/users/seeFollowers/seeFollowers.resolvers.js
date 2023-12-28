import client from "../../client";

export default {
  Query: {
    seeFollowers: async (_, { username, page }) => {
      const ok = await client.user.findUnique({
        where: { username },
        select: { id: true },
      });
      if (!ok) {
        return {
          ok: false,
          error: "User no Found",
        };
      }
      const followers = await client.user
        .findUnique({
          where: {
            username,
          },
        })
        .followers({ take: 5, skip: (page - 1) * 5 });
      const totalFollowers = await client.user.count({
        where: { following: { some: { username } } }, // 다른사람 팔로잉에 내 이름이 있는 것
      });

      return {
        ok: true,
        followers,
        totalPages: Math.ceil(totalFollowers / 5),
      };
    },
  },
};
