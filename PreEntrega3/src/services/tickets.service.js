export default class TicketsService {
	constructor(dao) {
		this.dao = dao;
	}

	async getTickets() {
		return await this.dao.getTickets();
	}

	async addTicket(ticket) {
		return await this.dao.addTicket(ticket);
	}
}