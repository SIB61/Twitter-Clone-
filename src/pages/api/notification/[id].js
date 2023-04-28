import { handleRequest } from "@/shared/middlewares/request-handler"
import { getServerSession } from "next-auth"
import { createOptions } from "../auth/[...nextauth]";
import { deleteMessageNotification } from "@/features/notification/services/server/delete-message-notification.server";
export default handleRequest({
  
  DELETE:async(req,res)=>{
      const { user } = await getServerSession(req, res, createOptions(req));
      const {type,id} = req.query
      if(type==='message'){
        await deleteMessageNotification({userId:user.id,notificationSenderId:id})
      } 
  }

})
