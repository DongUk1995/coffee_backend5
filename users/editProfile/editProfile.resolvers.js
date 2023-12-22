import { bcrypt } from "bcrypt";
import client from "../../client";
import { protectResolver } from "../../users.utils";
import createWriteStream from "fs";

export default {
  Mutation: {
    editProfile: protectResolver(
      async (
        _,
        {
          username,
          email,
          name,
          location,
          password: newPassword,
          avatarURL: avatar,
          githubUsername,
        },
        { loggedInUser }
      ) => {
        let avatarUrl = null;
        if (avatar) {
          const { filename, createReadStream } = await avatar;
          const newFilename = `${loggedInUser.id} -${Date.now} - ${filename}`;
          const readStream = createReadStream();
          const wirteStream = createWriteStream(
            process.cwd() + "/uploads" + newFilename
          );
          readStream.pipe(wirteStream);
          avatarUrl = `http://localhost:4000/static/${newFilename}`;
        }
        let uglyPassword = null;
        if (newPassword) {
          uglyPassword = await bcrypt.hash(newPassword, 10);
        }
        const updateUser = await client.user.update({
          where: {
            id: loggedInUser.id,
          },
          data: {
            username,
            email,
            name,
            location,
            ...(avatarUrl && { avatarURL }),
            ...(uglyPassword && { password: uglyPassword }),
            githubUsername,
          },
        });
        if (updateUser.id) {
          return {
            ok: true,
          };
        } else {
          return {
            ok: false,
            error: "Could not update profile.",
          };
        }
      }
    ),
  },
};
