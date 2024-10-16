import { BooksService } from './books.service.js'

export class BooksController {
    booksService = new BooksService()

    getList = async(req, res) => {
        try {
            const { userId } = req.user

            const books = await this.booksService.getList(userId)

            return res.status(200).json({ data : books })
        } catch (error) {
            return res.status(400).json({ message : error.message })
        } 
    }

    detail = async(req, res) => {
        try {
            const { bookId } = req.params
            const { userId } = req.user

            const books = await this.booksService.detail(bookId, userId)

            return res.status(200).json({ data : books })
        } catch(error) {
            return res.status(400).json({ message : error.message })
        }
        
    }

    cancel = async(req, res) => {
        try {
            const { bookId } = req.params
            const { userId } = req.user

            await this.booksService.cancel(bookId, userId)
            
            return res.status(200).json({ message : '취소 완료' })
        } catch(error) {
            return res.status(400).json({ message : error.message })
        }
        
    }
}