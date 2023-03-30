
function getCommentsTree(comments){
  return comments.map(comment=>{
    if(!comment.comment){
      comment.replies = getCommentTree(comments,comment)
      return comment
    }
  }).filter(comment=>!!comment)
}

function getCommentTree(comments,parentComment){
  return comments.map(comment=>{
    if(comment.comment === parentComment.id){
       return comment
    }
  }).filter(comment=>(!!comment))
}

console.log(JSON.stringify(getCommentsTree([{id:1,comment:null},{id:2,comment:1},{id:3,comment:null},{id:4,comment:2}])))
