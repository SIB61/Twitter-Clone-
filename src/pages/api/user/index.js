import { sendVerificationMail } from "@/lib/helpers/sendVerificationMail";
import { handleRequest } from "@/lib/middlewares/request-handler";
import createUser from "@/lib/services/user/create-user.server";
import { getUserByEmail } from "@/lib/services/user/get-user.server";
import { generateVerificationToken } from "@/utils/generateVerificationToken";
export default handleRequest({
  POST: async (req, res) => {
    const { name, email, password, dateOfBirth } = req.body;
    const verificationToken = generateVerificationToken();
    const username = email.split("@")[0];
    let user = await getUserByEmail(email);
    if (user) {
      throw { status: 409, error: "user exists" };
    }
    user = await createUser({
      name,
      username,
      email,
      dateOfBirth,
      password,
      verificationToken,
    });
    await sendVerificationMail({
      email: email,
      id: user.id,
      verificationToken,
    });
    return res.status(201).json({
      success: true,
    });
  },
});
