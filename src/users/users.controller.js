import { UsersService } from "./users.service.js";

export class UsersController {
    usersService = new UsersService()

    signUp = async (req, res, next) => {
        try {
        const {email, name, password, passwordConfirm, role} = req.body
        await this.usersService.signUp(email, name, password, passwordConfirm, role)
        return res.status(201).json({message : "회원가입 완료"})
        } catch (error) {
            return res.status(400).json({ message: error.message });
        }
    }
}