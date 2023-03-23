import createUser from '@/features/user/services/server/create-user'
import { handleRequest } from '@/shared/middlewares/request-handler'
import * as bcrypt from 'bcryptjs'
export default handleRequest({

  GET(req,res){
    
    res.send("hello")       
  },

  async POST(req,res){
     const {name,username,email,password,dateOfBirth} = req.body
     const passwordHash = bcrypt.hashSync(password)
     try{
     const user = await createUser({name,username,email,dateOfBirth,passwordHash})
     res.json(user)
     } catch(err){
     console.log(err)
     res.status(err.status).send(err.message) 
     }
  }
})
