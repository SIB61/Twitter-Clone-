import { handleRequest } from "@/shared/middlewares/request-handler";
import { getServerSession } from "next-auth";
import { createOptions } from "../auth/[...nextauth]";
import UserModel from "@/core/schemas/user.schema";

export default handleRequest({
  GET: async (req, res) => {
    try {
      const { user } = await getServerSession(req, res, createOptions(req));
      const notifications = await UserModel.findById(user?.id).select({
        notifications: 1,
      });
      return res.status(200).json(notifications);
    } catch (error) {
      return res.status(404).send();
    }
  },
});
