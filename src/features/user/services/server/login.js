import UserModel from "@/core/schemas/user.schema";
import { mapId } from "@/shared/utils/mapId";
import * as bcrypt from "bcryptjs";

export async function login({ email, password }) {
  let user = await UserModel.findOne({ email });
  if (!user) {
    throw { status: 404, error: "Email not found" };
  }
  if(!user.passwordHash){
    throw {status:400,error: "please login with github"}
  }
  const isValid = bcrypt.compareSync(password, user.passwordHash);
  if (!isValid) {
    throw { status: 400, error: "email or password incorrect" };
  }
  user = mapId(user._doc);
  const { passwordHash, totalFollowers, totalFollowings, ...userData } = user;
  return userData;
}
