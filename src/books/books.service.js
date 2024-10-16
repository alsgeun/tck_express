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

    detail = async(bookId, userId) => {
        const bookScheduleInfo = await this.booksRepository.bookDetail(bookId, userId)
        if(!bookScheduleInfo || Object.keys(bookScheduleInfo).length === 0 || bookScheduleInfo === null)
            throw new Error('예매 정보가 없습니다.')

        const showInfo = await this.booksRepository.showDetail(bookScheduleInfo.showId)
        if(!showInfo || Object.keys(showInfo).length === 0 || showInfo === null)
            throw new Error('예매 정보가 없습니다.')
        return { bookScheduleInfo, showInfo }
    }
}