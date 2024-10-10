import jwt from 'jsonwebtoken'
import {prisma} from '../../prisma/index.js'
import dotenv from 'dotenv'

dotenv.config()
export default async(req, res, next) => {
    try {
    const { authorization } = req.cookies
    if (!authorization) throw new Error ('토큰이 존재하지 않습니다.')

    const [tokenType,token] = authorization.split(' ')

    if (tokenType !== 'Bearer') throw new Error ('토큰 타입 형식이 Bearer가 아닙니다.')
    if (!token) return res.status(400).json({ message : '인증 정보가 올바르지 않습니다.' })
    
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET)
    const userId = decodedToken.userId
    const user = await prisma.users.findFirst({
        where : {
            userId : +userId
        }
    })
    if (!user) throw new Error('토큰 사용자가 존재하지 않습니다.')
    
    req.user = user
    
    next()
    } catch (error) {
    res.clearCookie('authorization')
    if (error.name === 'TokenExpiredError') return res.status(401).json({ message : '토큰이 만료되었습니다.'})
    return res.status(400).json({message: error.message})
    }
}