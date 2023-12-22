import client from "../client";
export default {
  Query: {
    seeUser: async (_, { id }, { client }) => {
      const user = client.user.findUnique({
        where: { id },
      });
      return user;
    },
  },
};
