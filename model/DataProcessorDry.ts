import Database from '~/model/Database'

export default class DataProcessorDry {
	private _data
	private static instance: DataProcessorDry
	private static database: Database

	private constructor() {}

	static getInstance() {
		if (!DataProcessorDry.instance) {
			DataProcessorDry.instance = new DataProcessorDry()
			DataProcessorDry.database = Database.getInstance()
		}
		return DataProcessorDry.instance
	}

	get data() {
		return this._data
	}

	// TODO enrich data
	processData() {
		this._data = DataProcessorDry.database.data.filter(brand => {
			return brand.type === 'dry'
		})
	}
}
