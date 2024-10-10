import {prisma} from "../../prisma/index.js"
import bcrypt from "bcrypt"

export class UsersRepository {
    signUp = async (email, name, password, role) => {
        await prisma.users.create({
            data : {
                email,
                userName : name,
                password,
                role 
            } 
        })
    }

    findByUser = async(email) => {
        const foundUser = await prisma.users.findUnique({ where : { email } })
        return foundUser
    }

    comparePassword = async(email, password) => {
        const user = await prisma.users.findUnique({ where : { email } })
        const comparePassword = await bcrypt.compare(password, user.password)
        return comparePassword
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