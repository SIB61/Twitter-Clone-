import TweetModel, { tweetId } from "@/core/schemas/tweet.schema";
import UserModel from "@/core/schemas/user.schema";
import { mapId } from "@/shared/utils/mapId";
export async function createTweet({content,parent,image,user,type}){
   try{
    let tweet = await TweetModel.create({content:{text:content,image},parent,user,type})
    tweet = mapId(tweet._doc)
    if(type===undefined|'tweet'|'retweet'){
      await UserModel.updateOne({_id:user.id},{$push:{tweets:tweet.id}}) 
    } else if(type === 'reply' && parent){
      await TweetModel.updateOne({_id:parent},{$push:{replies:tweet.id}})
    }
   return tweet
   } catch(err){
    console.log(err)
    throw {status:500,error:'something went wrong'}
  }
}
