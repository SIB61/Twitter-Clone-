import { mapId } from "@/shared/utils/mapId"

export function getTweetListItem(tweet,user){
    tweet.isLiked = user? tweet?.likes?.reduce((acc,cur)=> acc || cur.toString()===user?.id?.toString(),false) : false
    tweet.totalLikes = tweet?.likes?.length
    tweet.totalComments = tweet?.replies?.length
    return mapId(tweet)
}
