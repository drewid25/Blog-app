import { User,Post, Prisma } from "@prisma/client"

export interface PostCreate{
    post:{
        title?:string
        content?:string

    }
   

}
export interface PostPayloadType{
    userErrors:{
        message:string
    }[],
    post: Post | Prisma.Prisma__PostClient<Post>|null
}
export interface UserCreate{
    user:{
        name:string
        email:string
        password:string
        
        
    }
}
export interface UserPayloadType{
    userErrors:{
        message:string
    }[],
    user: User | Prisma.Prisma__UserClient<User>|null
}