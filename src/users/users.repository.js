import {prisma} from "../../prisma/index.js"
import bcrypt from "bcrypt"

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

    findByUser = async(email, password) => {
        const foundUser = await prisma.users.findUnique({ where : { email } })
        if (!foundUser || !await bcrypt.compare(password, foundUser.password))
            throw new Error("이메일이 존재하지 않거나 비밀번호가 일치하지 않습니다.")
        return foundUser
    }

    profile = async(userId) => {
        const user = await prisma.users.findUnique({
            where : {
                userId : +userId
            },
            select : {
                userId : true,
                email : true,
                userName : true,
                points : true,
                role : true
            }
        })
        return user
    }
}