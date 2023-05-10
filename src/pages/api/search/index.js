import { searchUser } from "@/features/user/services/server/search-user";
import { handleRequest } from "@/shared/middlewares/request-handler";

export default handleRequest({
  POST: async (req, res) => {
    const { user } = req.body;
    if (user) {
      try {
        const users = await searchUser(user);
        return res.json({ success: true, error: null, data: users });
      } catch (err) {
        return res.status(err.status || 500).json({
          success: false,
          error: err.error || "something went wrong",
          data: {},
        });
      }
    }
    return res.end();
  },
});
