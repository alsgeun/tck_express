import { ShowsRepository } from "./shows.repository.js"
import { SchedulesRepository } from "../schedules/schedules.repository.js"
import { BooksRepository } from "../books/books.repository.js"
import { UsersRepository } from "../users/users.repository.js"
import { SeatsRepository } from "../seats/seats.repository.js"

export class ShowsService {
    showsRepository = new ShowsRepository()
    schedulesRepository = new SchedulesRepository()
    booksRepository = new BooksRepository()
    usersRepository = new UsersRepository()
    seatsRepository = new SeatsRepository()

    register = async(userId, role, showName, description, category, venue, price, performer, image, date, time, totalSeat) => {
        
        if (role !== 'producer')
            throw new Error('공연 제작자만 공연 등록이 가능합니다. 제작자로 회원가입 해주세요.')
        if (!showName)
            throw new Error('공연 이름을 작성해주세요.')
        if (!description)
            throw new Error('공연 설명을 작성해주세요.')
        if (!category)
            throw new Error('sports, musical, concert, drama, classic, etc 중에 한가지를 입력해주세요.')
        if (!venue)
            throw new Error('공연 장소를 작성해주세요.')
        if (!price)
            throw new Error('공연 가격을 책정해주세요.')
        if (!performer)
            throw new Error('공연 출연진을 작성해주세요.')
        if (!date)
            throw new Error('공연 날짜를 작성해주세요.')
        if (!time)
            throw new Error('공연 시간을 작성해주세요.')
        if (!totalSeat)
            throw new Error('총 좌석수를 설정해주세요.')

        const validCategories = ['sports', 'musical', 'concert', 'drama', 'classic', 'etc']
        if (!validCategories.includes(category)) 
            throw new Error('공연 카테고리를 제대로 입력해주세요.')

        const overlappingShow = await this.showsRepository.findShow(showName)
        if (overlappingShow) {
            throw new Error('중복된 공연 이름입니다.')
        }

        if (date.includes('~')) {
            throw new Error('날짜에는 "~"를 사용할 수 없습니다.')
        }

        // 입력 받은 날짜에 대한 나름의 유효성 검사(',' 포함-> ,을 기준으로 나눔, 공백제거, '.'이있으면 '-'으로 변환 등)
        const stringDate = date.split(',').map(a => a.trim().replace(/\./g, '-'))
        const stringTime = time.split(',').map(a => a.trim())

        const results = []

        for (let i = 0; i < stringDate.length; i++) {
            const dateString = stringDate[i]
            const timeString = stringTime[i]

            // ISO 형식의 UTC 시간으로 변환 및 date 객체 생성
            const isoDateTime = `${dateString}T${timeString}:00`
            const dateTime = new Date(isoDateTime)

            const result = await this.showsRepository.register(userId, showName, description, category, venue, price, performer, image, dateString, timeString, dateTime, totalSeat)
            results.push(result)
        }
        
        return results
    }

    search = async(searchWord) => {
        if (searchWord.length === 0) {
        const allShows = await this.showsRepository.findAllShows()
            if (!allShows) {
                throw new Error('공연을 찾지 못했습니다.')
            }
            return allShows
        }

        const shows = await this.showsRepository.findShows(searchWord)
        if (!shows) {
            throw new Error('공연을 찾지 못했습니다.')
        }
        return shows
    }

    detailShow = async(showId) => {
        const show = await this.showsRepository.findDetailShowWithId(showId)
        if (!show)
            throw new Error('공연을 찾지 못했습니다.')
        return show
    }

    standing = async(scheduleId, seatEA, userId, points) => {
        const schedules = await this.schedulesRepository.findSchedules(scheduleId)

        if (!schedules)
            throw new Error('해당 공연 회차가 존재하지 않습니다.')
        if (schedules.show.category === 'past')
            throw new Error('지난 공연입니다.')
        if (schedules.booksStatus === 'impossible')
            throw new Error('예매가 불가능한 회차입니다.')

        // 예매내역 생성
        await this.booksRepository.records(schedules.scheduleId, userId)

        const price = schedules.show.price
        const userPoints = points - price

        // 포인트 차감
        await this.usersRepository.updatePoints(userId, userPoints)

        // 좌석 갯수 차감
        const seat = schedules.seats.availableSeat
        if (seatEA > seat)
            throw new Error(`최대 ${seat}석 까지만 예약이 가능합니다.`)
        const remainingSeat = seat - seatEA
        const updatedSeat = await this.seatsRepository.updateSeat(schedules.scheduleId, remainingSeat)

        // 예매 후 매진시 예매 불가능으로 상태 변경
        if (updatedSeat.availableSeat === 0)
            await this.schedulesRepository.changeStatus(updatedSeat.scheduleId)
    }
}