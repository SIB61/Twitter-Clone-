import TweetModel from "@/core/schemas/tweet.schema";
import UserModel from "@/core/schemas/user.schema";
import { mapId } from "@/shared/utils/mapId";

export async function createTweet({ text, image, user}) {
  try {
    const tweet = await TweetModel.create({content:{text,image},user,type:"tweet"})
    await UserModel.updateOne({_id:user.id},{$push:{tweets:tweet._id},$inc:{totalTweets:1}})
    return mapId(tweet._doc)
  } catch (err) {
    console.log("error in create tweet method",err);
    throw { status: 500, error: err.message };
  }
}

export async function createComment({text,image,user,origin}){
   try{
    const reply = await TweetModel.create({content:{text,image},user,origin,type:"reply"})
    await TweetModel.updateOne({_id:origin},{ $push:{replies:reply._id}, $inc:{totalReplies:1}})
    return mapId(reply._doc)
  } catch(err){
    throw {status:500, error:err.message}
  }
}

export async function createReply({text,image,user,origin,immediateOrigin}){
   try{
    const reply = await TweetModel.create({content:{text,image},user,origin,immediateOrigin,type:"reply"})
    const promiseOne = TweetModel.updateOne({_id:origin},{$inc:{totalReplies:1}})
    const promiseTwo = TweetModel.updateOne({_id:immediateOrigin},{$push:{replies:reply._id},$inc:{totalReplies:1}})
    await Promise.all([promiseOne, promiseTwo])
    return mapId(reply._doc)
  } catch(err){
    throw {status:500, error:err.message}
  }
}

