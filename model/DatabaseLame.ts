import { MongoClient } from 'mongodb'

// lame version of Database
// synchronous code works
export default class Database {
	private _data
	private static instance: Database

	private constructor(data) {
		this._data = data
	}

	static getInstance(data) {
		if (!Database.instance) {
			Database.instance = new Database(data)
		}
		return Database.instance
	}

	set data(customData) {
		this._data = customData
	}

	get data(): any {
		return this._data
	}

	public fetchDatabase() {
		this._data = [
			{
				name: 'data3',
				age: 33,
			},
			{
				name: 'data4',
				age: 44,
			},
		]
	}
}
