import { ShowsService } from './shows.service.js'

export class ShowsController {
    showsService = new ShowsService()

    register = async(req, res) => {
        try {
        const { role } = req.user
        const { showName, description, category, venue, price, performer, image, date, time, totalSeat } = req.body
        
        const show = await this.showsService.register(
            role, showName, description, category, venue, price, performer, image, date, time, totalSeat
        )
        
        return res.status(200).json({ message : '공연 등록완료', data : show})
        } catch (error) {
            return res.status(400).json({ message : error.message })
        }
        
    }
}