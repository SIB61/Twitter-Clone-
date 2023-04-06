import createUser from "@/features/user/services/server/create-user";
import { getUserByEmail } from "@/features/user/services/server/get-user";
import { handleRequest } from "@/shared/middlewares/request-handler";
import * as bcrypt from "bcryptjs";
export default handleRequest({
  POST: async (req, res) => {
    try {
      const { name, email, password, dateOfBirth } = req.body;
      const passwordHash = bcrypt.hashSync(password);
      const username = email.split("@")[0];
      let user = await getUserByEmail(email);
      if (user) return res.status(409).send("user exists");
      user = await createUser({
          name,
          username,
          email,
          dateOfBirth,
          passwordHash,
        });
      return res.json(user);
    } catch (err) {
      console.log(err)
      return res.status(err.status).send(err.message);
    }
  },
});
