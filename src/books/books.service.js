import { BooksRepository } from './books.repository.js'
import { SeatsRepository } from '../seats/seats.repository.js'
import { SchedulesRepository } from '../schedules/schedules.repository.js'

export class BooksService {
    booksRepository = new BooksRepository()
    seatsRepository = new SeatsRepository()
    schedulesRepository = new SchedulesRepository()

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

    cancel = async(bookId, userId) => {
        const findBook = await this.booksRepository.bookDetail(bookId, userId)
        if (!findBook || Object.keys(findBook).length === 0 || findBook === null) 
            throw new Error('예약 정보를 찾지 못하였습니다.')

        
        const updatedSeatEa = findBook.schedule.seats.availableSeat + 1

        await this.booksRepository.cancel(findBook.bookId, findBook.userId)

        // 취소할 때마다 좌석 갯수 +1(원복)
        const updatedAvailableSeats = await this.seatsRepository.restore(updatedSeatEa, findBook.scheduleId)
        const bookStatus = await this.schedulesRepository.findSchedules(updatedAvailableSeats.scheduleId)

        // 마지막표 취소에 따른 예매 가능여부 변경
        if (updatedAvailableSeats.availableSeat > 0 && bookStatus.booksStatus ===  'impossible') {
            await this.schedulesRepository.restoreStatus(updatedAvailableSeats.scheduleId)
        }
    }
}