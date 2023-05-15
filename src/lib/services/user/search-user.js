import UserModel from "@/lib/models/user.schema";
import { mapId } from "@/utils/mapId";

export async function searchUser(name) {
  const users = await UserModel
    .find(
      { $text: { $search: name }, isVerified:true },
      { score: { $meta: "textScore" } }
    )
    .sort({ score: { $meta: "textScore" } })
    .select("name username email image")
    .lean();
  return users.map(user=>mapId(user))
}
