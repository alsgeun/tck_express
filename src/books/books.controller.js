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
}