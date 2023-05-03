import { searchUser } from "@/features/user/services/server/search-user";
import { handleRequest } from "@/shared/middlewares/request-handler";

export default handleRequest({
  POST: async (req, res) => {
    const { user } = req.body;
    if (user) {
      try {
        const users = await searchUser(user);
        return res.json(users);
      } catch (err) {
        return res.status(500).send()
      }
    }
    return res.end();
  },
});
