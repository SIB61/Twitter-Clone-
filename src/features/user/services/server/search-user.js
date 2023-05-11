import UserModel from "@/core/schemas/user.schema";
import { mapId } from "@/shared/utils/mapId";

export async function searchUser(name) {
  const users = await UserModel
    .find(
      { $text: { $search: name }, isVerified:true },
      { score: { $meta: "textScore" } }
    )
    .sort({ score: { $meta: "textScore" } })
    .select("name username email")
    .lean();
  return users.map(user=>mapId(user))

}
