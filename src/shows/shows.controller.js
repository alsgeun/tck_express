import { ShowsService } from './shows.service.js'

export class ShowsController {
    showsService = new ShowsService()

    register = async(req, res) => {
        try {
        const { userId, role } = req.user
        const { showName, description, category, venue, price, performer, date, time, totalSeat } = req.body
        
        let image

        if (req.file) {
            image = `s3_url/${req.file.originalname}`
        } else {
            image = req.body.image
        }

        const show = await this.showsService.register(
            userId, role, showName, description, category, venue, price, performer, image, date, time, totalSeat
        )
        
        return res.status(200).json({ message : '공연 등록완료', data : show})
        } catch (error) {
            if (!res.headersSent) {
                return res.status(400).json({ message: error.message });
            }
        }
        
    }

    search = async(req, res) => {
        try {
        const { searchWord } = req.body

        const shows = await this.showsService.search(searchWord)

        return res.status(200).json({ data : shows })
        } catch (error) {
            return res.status(400).json({ message : error.message })
        }
        
    }

    detailShow = async(req, res) => {
        try {
            const { showId } = req.params
            const show = await this.showsService.detailShow(showId)
            return res.status(200).json({ data : show })
        } catch (error){
            return res.status(400).json({ message : error.message })
        }
    }

    standing = async(req, res) => {
        try {
            const { scheduleId, seatEA } = req.body
            const { userId, points } = req.user
            const { showId } = req.params

            await this.showsService.standing(scheduleId, seatEA, userId, points, showId)
            
            return res.status(200).json({ message : '예매 완료' })
        } catch (error) {
            return res.status(400).json({ message : error.message })
        }
    }

    deleteShow = async(req, res) => {
        try {
            const { email, userId, role } = req.user
            const { showId } = req.params
            const { password } = req.body

            await this.showsService.deleteShow(email, userId, role, showId, password)

            return res.status(200).json({ message : '공연 삭제 완료'})
        } catch (error) {
            return res.status(400).json({ message : error.message })
        }
        
    }
}