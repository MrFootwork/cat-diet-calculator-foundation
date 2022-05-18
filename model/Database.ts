export default class Database {
	private _rawData
	private static instance: Database

	private constructor(data) {
		this._rawData = data
	}

	static getInstance(data) {
		if (!Database.instance) {
			Database.instance = new Database(data)
		}
		return Database.instance
	}

	set data(customData) {
		this._rawData = customData
	}

	get data(): any {
		return this._rawData
	}

	async fetchDatabase() {
		const data = await fetch('api/getData')
		console.log('data: ', data)
		let json = await data.json()
		console.log('json: ', json)
		this._rawData = json
	}
}
