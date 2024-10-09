import { UsersRepository } from "./users.repository.js";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import dotenv from "dotenv"

dotenv.config();
export class UsersService {
    usersRepository = new UsersRepository()

    signUp = async(email, name, password, passwordConfirm, role) => {
        if (!email)
            throw new Error("이메일을 입력해주세요")
        if (!name)
            throw new Error("이름을 입력해주세요.")
        if (!password)
            throw new Error("비밀번호를 입력해주세요.")
        if (!passwordConfirm)
            throw new Error("비밀번호를 재입력해주세요.")
        if (!role)
            throw new Error("user와 producer 중 하나를 입력해주세요.")
        if (password !== passwordConfirm)
            throw new Error("비밀번호가 맞지 않습니다.")
        const hashedPassword = await bcrypt.hash(password, 10)
        await this.usersRepository.signUp(email, name, hashedPassword, role)
    }

    signIn = async(email, password) => {
        if (!email || !password) throw new Error("이메일 혹은 비밀번호를 입력해주세요")

        const user = await this.usersRepository.findByUser(email, password)
        const token = jwt.sign({ userId: user.userId }, process.env.JWT_SECRET, {expiresIn: "12h"});
        return token
    }
}