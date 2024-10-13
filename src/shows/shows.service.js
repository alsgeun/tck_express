import { ShowsRepository } from "./shows.repository.js"

export class ShowsService {
    showsRepository = new ShowsRepository()

    register = async(role, showName, description, category, venue, price, performer, image, date, time, totalSeat) => {
        
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
        if (overlappingShow)
            throw new Error('중복된 공연 이름입니다.')
        
        const show = await this.showsRepository.register(showName, description, category, venue, price, performer, image, date, time, totalSeat)
        return show
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
}