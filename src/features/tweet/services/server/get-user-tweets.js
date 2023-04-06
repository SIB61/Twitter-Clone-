// import TweetModel from "@/core/schemas/tweet.schema";
// import { mapId } from "@/shared/utils/mapId";
// import { getIsLikedMany } from "./get-is-liked";
//
// export async function getUserTweets(userId){
//   try{
//     let tweets = await TweetModel.find({"user.id":userId}).lean()
//     tweets = tweets.map(tweet=>mapId(tweet))
//     tweets = await getIsLikedMany({tweets:tweets,userId:userId})
//     return tweets  
//   }catch(err){
//     console.log(err)
//     throw err
//   }
// }
