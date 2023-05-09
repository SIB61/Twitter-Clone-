import { sendVerificationMail } from "@/core/utils/sendVerificationMail";
import createUser from "@/features/user/services/server/create-user.server";
import { getUserByEmail } from "@/features/user/services/server/get-user.server";
import { handleRequest } from "@/shared/middlewares/request-handler";
import { generateVerificationToken } from "@/shared/utils/generateVerificationToken";
export default handleRequest({
  POST: async (req, res) => {
    try {
      const { name, email, password, dateOfBirth } = req.body;
      const verificationToken = generateVerificationToken();
      const username = email.split("@")[0];
      let user = await getUserByEmail(email);
      if (user) return res.status(409).json({ error: "user exists" });
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
    } catch (err) {
      console.log(err);
      return res.status(err.status || 500).json({
        success: false,
        error: err.error || "something went wrong",
        data: {},
      });
    }
  },
});
