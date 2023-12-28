import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import client from "../../client";

export default {
  Mutation: {
    login: async (_, { username, password }) => {
      try {
        const user = await client.user.findFirst({ where: { username } });
        if (!user) {
          return { ok: false, error: "User not found." };
        }
        const passwordOk = await bcrypt.compare(password, user.password);
        if (!passwordOk) {
          return { ok: false, error: "password check" };
        }
        const token = await jwt.sign({ id: user.id }, process.env.SECRET_KEY);
        return { ok: true, token };
      } catch (e) {
        return { ok: false, error: "error ㅋㅋ" };
      }
    },
  },
};
