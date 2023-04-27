import { sendVerificationMail } from "@/core/utils/sendVerificationMail";
import createUser from "@/features/user/services/server/create-user.server";
import { getUserByEmail } from "@/features/user/services/server/get-user.server";
import { searchUser } from "@/features/user/services/server/search-user";
import { handleRequest } from "@/shared/middlewares/request-handler";
import { generateVerificationToken } from "@/shared/utils/generateVerificationToken";
import { mapId } from "@/shared/utils/mapId";
export default handleRequest({
  POST: async (req, res) => {
    try {
      const { name, email, password, dateOfBirth } = req.body;
      const verificationToken = generateVerificationToken()
      const username = email.split("@")[0];
      let user = await getUserByEmail(email);
      if (user) return res.status(409).send("user exists");
      user = await createUser({
          name,
          username,
          email,
          dateOfBirth,
          password,
          verificationToken
        });
      await sendVerificationMail({email:email,id:user.id,verificationToken})
      return res.status(201).json(true);
    } catch (err) {
      console.log(err)
      return res.status(err.status).send(err.message);
    }
  },

  GET: async (req,res) =>{
    const {search} = req.query
    if(search){
        const searchText = search.replace('_'," ")
        const users = await searchUser(searchText)
        return res.json(users)
    }
    return res.end()
  }

});
