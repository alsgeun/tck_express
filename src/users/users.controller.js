import { UsersService } from "./users.service.js";

export class UsersController {
    usersService = new UsersService()

    signUp = async(req, res) => {
        try {
        const {email, name, password, passwordConfirm, role} = req.body
        await this.usersService.signUp(email, name, password, passwordConfirm, role)
        return res.status(201).json({message : "회원가입 완료"})
        } catch (error) {
            return res.status(400).json({ message: error.message });
        }
    }

    signIn = async(req, res) => {
        try {
        const {email, password} = req.body
        const tokens = await this.usersService.signIn(email, password)
        
        res.cookie("authorization", `Bearer ${tokens}`)
        return res.status(200).json({message : "로그인 성공"})
        } catch (error) {
            return res.status(400).json({ message : error.message })
        } 
    }
}