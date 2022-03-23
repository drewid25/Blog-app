import { Context } from ".."


interface canUserMutatePostParams{
    userId:number
    postId:number
    prisma:Context["prisma"]
}

export const canUserMutatePost=async({
    userId,
    postId,
    prisma}
    :canUserMutatePostParams)=>{
const user = await prisma.user.findUnique({
    where:{
        id:userId
    }
})
if(!user){
    return{
        userErrors:[{
            message:"User not found"
        }],
        post:null,
    }
}
const post = await prisma.post.findUnique({
    where:{
        id:postId
    }
})
if (post?.authorID !== user.id){
    return{
        userErrors:[{
            message:"User not owned by user"
        }],
        post:null,
    }
}
}