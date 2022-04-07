
import { Context } from "../index";
interface PostTypeArgs{
    id:number


}
export const Query ={
   posts: (parent:any, args:any,{prisma}:Context)=>{
   return prisma.post.findMany({
         orderBy:[
             {
                 createdAt:"desc"
             },
             
         ],
    })
   
},
post:(parent:any,args:PostTypeArgs,{prisma}:Context)=>{
    return prisma.post.findUnique({
        where:{
            id:Number(args.id)
        }
    })
 
}
}