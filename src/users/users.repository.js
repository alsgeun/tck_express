import {prisma} from "../../prisma/index.js"

export class UsersRepository {
    signUp = async (email, name, password, role) => {
        const identifiedEmail = await prisma.users.findFirst({
            where : {
                email
            }
        })
        if (identifiedEmail) {
            throw new Error ("중복된 이메일입니다.")
        } else {
            await prisma.users.create({
                data : {
                    email,
                    userName : name,
                    password,
                    role 
                } 
            })
        }
            
    }
}