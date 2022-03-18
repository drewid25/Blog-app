import { Post } from "@prisma/client"
import {Context} from "../index"
interface PostCreate{
    title:string
    content:string
}
interface PostPayloadType{
    userErrors:{
        message:string
    }[],
    post: Post | null
}
export const Mutation ={
    postCreate:async (_: any,{title,content}: PostCreate,{prisma}:Context):Promise<PostPayloadType>=>{
        if(!title || !content){
            return{
                userErrors:[{
                    message:"You must provide a title and content to create a post"
                }],
                post:null
            }
           
        }
        
        
        
       const post = await prisma.post.create({
           data:{
               title,
               content,
               authorID:1
           },
       });
        
       return{
        userErrors:[],
        post:post
  }  
    
},
        
   
        
    
}
