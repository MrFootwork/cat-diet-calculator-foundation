import type { IncomingMessage, ServerResponse } from 'http'

import { MongoClient } from 'mongodb'
import { config } from 'dotenv'

export default async (req: IncomingMessage, res: ServerResponse) => {
	let data = []
	data = await fetchMongo()
	res.writeHead(200, { 'Content-Type': 'application/json' })
	res.write(JSON.stringify(data))
	res.end()
}

async function fetchMongo() {
	const uri = process.env.MONGODB_URI
	const mongoClient: MongoClient = new MongoClient(uri)

	try {
		await mongoClient.connect()
		const db = mongoClient.db('food')
		const dry = await db.collection('dry').find({}).toArray()
		const wet = await db.collection('wet').find({}).toArray()

		return [...dry, ...wet]
	} catch (e) {
		console.error('could not read from database. ', e)
	} finally {
		await mongoClient.close()
	}
}
