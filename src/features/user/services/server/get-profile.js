import UserModel from "@/core/schemas/user.schema";
import { getTweetListItem } from "@/features/tweet/services/server/getTweetListItem";
import { mapId } from "@/shared/utils/mapId";

export async function getProfileWithTweets(id) {
  let profile = await UserModel.findById(id)
    .select({ passwordHash: 0 })
    .populate({ path: "tweets", options: { sort: { createdBy: -1 } } })
    .lean();
  profile = mapId(profile);
  profile.tweets = profile.tweets.map((tweet) =>
    getTweetListItem(tweet, profile)
  );
  profile.totalTweets = profile.tweets.length;
  profile.totalFollowers = profile.followers.length;
  profile.totalFollowings = profile.followings.length;
  console.log(profile);
  return profile;
}


export async function getProfileWithFollowers(id) {
  let profile = await UserModel.findById(id)
    .select({ passwordHash: 0 })
    .populate({
      path: "followers",
      select: "_id name username image",
      options: { sort: { createdBy: -1 } },
    })
    .lean();
  profile = mapId(profile);
  profile.followers = profile.followers.map((follower) => mapId(follower));
  profile.totalTweets = profile.tweets.length;
  profile.totalFollowers = profile.followers.length;
  profile.totalFollowings = profile.followings.length;
  return profile;
}


export async function getProfileWithFollowings(id) {

  let profile = await UserModel.findById(id)
    .select({ passwordHash: 0 })
    .populate({
      path: "followings",
      select: "_id name username image",
      options: { sort: { createdBy: -1 } },
    })
    .lean();
  profile = mapId(profile);
  profile.followings = profile.followings.map((following) => mapId(following));
  profile.totalTweets = profile.tweets.length;
  profile.totalFollowers = profile.followers.length;
  profile.totalFollowings = profile.followings.length;
  return profile;
}

export async function getProfile(id,myId) {
  let profile = await UserModel.findById(id)
    .select({ passwordHash: 0 })
    .populate({
      path: "followings",
      select: "_id name username image",
      options: { sort: { createdBy: -1 } },
    })
    .populate({
      path:"followers",
      select: "_id name username image",
      options: { sort: { createdBy: -1 } },
    })
    .populate({
      path:"tweets",
      options: { sort: { createdBy: -1 } },
    })
    .lean();
  profile = mapId(profile);
  profile.followings = profile.followings.map((following) => mapId(following));
  profile.followers = profile.followers.map((follower) => mapId(follower));
  profile.tweets = profile.tweets.map((tweet) =>
    getTweetListItem(tweet, profile)
  );
  profile.isFollowing = profile.followers.reduce((acc,cur)=>acc||cur.id.toString()===myId.toString(),false)
  profile.totalTweets = profile.tweets.length;
  profile.totalFollowers = profile.followers.length;
  profile.totalFollowings = profile.followings.length;
  console.log(profile.isFollowing, profile.followers, myId)
  return profile;
}
