// import LikeModel from "@/core/schemas/likes.schema";
// export async function getIsLiked({userId,tweetId}){
//   try{
//     const isLiked = await LikeModel.findOne({likeId:tweetId+userId}).lean()
//     if(isLiked){
//        return true
//     } else return false 
//   }
//   catch(err){
//     throw {status:500,error:'something went wrong in getIsLiked'}
//   }
// }
//
// export async function getIsLikedMany({userId,tweets}){
//   const likeIds = tweets.map((tweet) => tweet.id + userId);
//   const likes = await LikeModel.find({ likeId: { $in: likeIds } });
//   let likedTweetIds = likes.map((like) => like.tweet);
//   likedTweetIds = new Set(likedTweetIds)
//   const newTweets = tweets.map((tweet) =>({...tweet,isLiked:likedTweetIds.has(tweet.id)}));
//   return newTweets
// }
