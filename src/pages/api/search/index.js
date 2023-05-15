import { handleRequest } from "@/lib/middlewares/request-handler";
import { searchUser } from "@/lib/services/user/search-user";

export default handleRequest({
  POST: async (req, res) => {
    const { user } = req.body;
    if (user) {
        const users = await searchUser(user);
        return res.json({ success: true, error: null, data: users });
    }
    return res.end();
  },
});
