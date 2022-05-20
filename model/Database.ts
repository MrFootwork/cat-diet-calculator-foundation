export default class Database {
	private _rawData
	private static instance: Database

	private constructor() {}

	static getInstance() {
		if (!Database.instance) {
			Database.instance = new Database()
			Database.instance.fetchMongo()
		}
		return Database.instance
	}

	set data(customData) {
		this._rawData = customData
	}

	get data(): any {
		return this._rawData
	}

	async fetchMongo() {
		const data = await fetch('api/getData')
		let json = await data.json()
		this._rawData = json
	}

	async resetDB() {
		await fetch('api/resetDB')
	}
}
