import Database from '~/model/Database'

export default class DataProcessorWet {
	private _data
	private static instance: DataProcessorWet
	private static database: Database

	private constructor() {}

	static getInstance() {
		if (!DataProcessorWet.instance) {
			DataProcessorWet.instance = new DataProcessorWet()
			DataProcessorWet.database = Database.getInstance()
		}
		return DataProcessorWet.instance
	}

	get data() {
		return this._data
	}

	// TODO enrich data
	processData() {
		this._data = DataProcessorWet.database.data.filter(brand => {
			return brand.type === 'wet'
		})
	}
}
