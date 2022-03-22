import { User,Post, Prisma } from "@prisma/client"
import {Context} from "../../index"
import {PostCreate,PostPayloadType,UserCreate,UserPayloadType} from "../Mutations/interfaces"

export const Mutation ={
    userCreate: async(
        _:any,
        {user}:UserCreate,
        {prisma}:Context)
        :Promise<UserPayloadType>=>{
         const {name,email,password} =user
         if(!name || !email ){
             return{
                 userErrors:[{
                     message:"You must provide a name,email,and password to create a user"
                 }],
                 user:null
             }
         }
         return{
             userErrors:[],
             user:prisma.user.create({
                 data:{
                     name,
                     email,
                     password:""
                     }
             })
            }
        },
    
    postCreate:async (
        _: any,
        {post}: PostCreate,
        {prisma}:Context)
        :Promise<PostPayloadType>=>{
        
        const {title,content}=post
        if(!title || !content  ){
            return{
                userErrors:[{
                    message:"You must provide a title and content to create a post"
                }],
                post:null
            }
           
        }
        return{
        userErrors:[],
        post:prisma.post.create({
            data:{
                title,
                content,
                
            },
        }),
  }  
    
  },
  
  postUpdate :async (
      _:any,
      {post,postId}:{postId: String,
      post:PostCreate["post"]},
      {prisma}:Context)
      :Promise<PostPayloadType>=>{
      
     const{title,content} = post
     if (!title && !content){
         return {
             userErrors:[
                 {
                     message: "Need to have at least one field to update"
                 }

             ],
             post:null
         }
        
     }
     const existingPost= await prisma.post.findUnique({
         where:{
             id:Number(postId)
         }
     })
     if (!existingPost){
        return {
            userErrors:[
                {
                    message: "Post does not exist"
                }

            ],
            post:null
        }
    }

    let payloadToUpdate ={
        title,
        content
    }

    if (!title)  delete payloadToUpdate.title;
    if (!content) delete payloadToUpdate.content
    return {
        userErrors:[],
         post: prisma.post.update({
             data:{
                 ...payloadToUpdate
             },
             where:{
                 id:Number(postId)
             }
         })
    }
            

    
            
},

postDelete:async(
    _:any,
    {postId}:{postId:string},
    {prisma}:Context
    ):Promise<PostPayloadType>=>{
     const post = await prisma.post.findUnique({
         where:{
             id:Number(postId)
         }
     })
     if (!post){
        return {
            userErrors:[
                {
                    message: "Post does not exist"
                }

            ],
            post:null
        }
    }
    await prisma.post.delete({
        where:{
            id:Number(postId)
        }
    });
    return {
        userErrors:[],
        post
    }
  },
}
