import TweetModel from "@/lib/models/tweet.schema";
import UserModel from "@/lib/models/user.schema";
import { handleRequest } from "@/lib/middlewares/request-handler";
import { createOptions } from "../auth/[...nextauth]";
import { getServerSession } from "next-auth";
import { parseForm } from "@/utils/parse-form";

export const config = {
  api: {
    bodyParser: false,
  },
};

export default handleRequest({
  PATCH: async (req, res) => {
    const { files, fields } = await parseForm(req);
    const { userId } = req.query;
    const { user: myUser } = await getServerSession(
      req,
      res,
      createOptions(req)
    );
    if (myUser.id != userId) {
      throw {
        status: 400,
        error: "do not have access",
      };
    }
    const profilePic = files.image
      ? "http://localhost:3000/uploads/" + files.image?.newFilename
      : undefined;
    const coverPic = files.cover
      ? "http://localhost:3000/uploads/" + files.cover?.newFilename
      : undefined;
    let updatedUser = await UserModel.findOneAndUpdate(
      { _id: userId },
      {
        ...fields,
        image: profilePic,
        cover: coverPic,
      },
      { new: true }
    );
    const { id, name, username, image } = mapId(updatedUser._doc);
    const user = { id, name, username, image };
    await TweetModel.updateMany({ "user.id": id }, { user: user });
    const { passwordHash, ...updatedUserWithoutPass } = mapId(updatedUser._doc);
    return res.json({
      success: true,
      error: null,
      data: updatedUserWithoutPass,
    });
  },
});
