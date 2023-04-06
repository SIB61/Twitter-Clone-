import * as bcrypt from "bcryptjs";
import { getUserByEmail } from "./get-user";

export async function login({ email, password }) {
  let user = await getUserByEmail(email) 
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
  const { passwordHash, followers, followings , tweets,  ...userData } = user;
  return userData;
}
