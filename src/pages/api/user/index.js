import createUser from "@/features/user/services/server/create-user.server";
import { getUserByEmail } from "@/features/user/services/server/get-user.server";
import { handleRequest } from "@/shared/middlewares/request-handler";
export default handleRequest({
  POST: async (req, res) => {
    try {
      const { name, email, password, dateOfBirth } = req.body;
      const username = email.split("@")[0];
      let user = await getUserByEmail(email);
      if (user) return res.status(409).send("user exists");
      user = await createUser({
          name,
          username,
          email,
          dateOfBirth,
          password
        });
      return res.json(user);
    } catch (err) {
      console.log(err)
      return res.status(err.status).send(err.message);
    }
  },
});
