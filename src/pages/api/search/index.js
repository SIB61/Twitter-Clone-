import { searchUser } from "@/features/user/services/server/search-user";
import { handleRequest } from "@/shared/middlewares/request-handler";

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
