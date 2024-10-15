import { BooksRepository } from './books.repository.js'

export class BooksService {
    booksRepository = new BooksRepository()

    getList = async(userId) => {
        const books = await this.booksRepository.getList(userId)

        if (!books || (books.booksInfo.length === 0 && books.shows.length === 0)) {
            throw new Error('예매 내역이 없습니다.')
        }
        
        return books
    }
}