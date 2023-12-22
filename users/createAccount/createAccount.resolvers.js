import bcrypt from "bcrypt";
import client from "../../client";

export default {
  Mutation: {
    // 사용자가 우리에게 줄 데이터
    createAccount: async (
      _,
      { username, email, name, password, location, githubUsername }
    ) => {
      try {
        // 먼저 사용자나 이메일이 데이터베이스에 있는지 확인한다.
        const existingUser = await client.user.findFirst({
          where: {
            OR: [
              {
                username,
              },
              {
                email,
              },
            ],
          },
        });
        if (existingUser) {
          throw new Error("이미 유저이름과 이메일이 존재합니다."); // throw를 하면 밑에 return은 실행 되지 않는다. 폭탄같은 거다 폭탄 터짐 좆댐
        }
        // 해시 패스워드
        const uglyPassword = await bcrypt.hash(password, 10);
        const data = {
          username,
          email,
          password: uglyPassword,
          ...(name && { name }),
          ...(location && { location }),
          ...(githubUsername && { githubUsername }),
        };
        const user = await client.user.create({
          data,
        });
        return {
          ok: true,
          id: user.id,
        };
      } catch (e) {
        return {
          ok: false,
          error: e.message,
        };
      }
    },
  },
};
