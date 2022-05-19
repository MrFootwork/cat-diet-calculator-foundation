import type { IncomingMessage, ServerResponse } from 'http'

import { MongoClient } from 'mongodb'
import { config } from 'dotenv'

export default async (req: IncomingMessage, res: ServerResponse) => {
	let data = []
	// data = await fetchMongo()
	data = await fetchSingle()
	res.writeHead(200, { 'Content-Type': 'application/json' })
	res.write(JSON.stringify(data))
	res.end()
}

async function fetchSingle() {
	const uri = process.env.MONGODB_URI
	const mongoClient: MongoClient = new MongoClient(uri)

	try {
		await mongoClient.connect()
		const db = mongoClient.db('food')
		// FIXME rename collection dry
		const dry = await db.collection('FoodBrands').find({}).toArray()
		return dry
	} catch (e) {
		console.error('could not read from database. ', e)
	} finally {
		await mongoClient.close()
	}
}
