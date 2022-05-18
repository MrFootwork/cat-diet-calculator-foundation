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

async function fetchMongo() {
	const uri = process.env.MONGODB_URI
	const mongoClient: MongoClient = new MongoClient(uri)

	try {
		await mongoClient.connect()
		const db = mongoClient.db('food')
		const collectionList = await db.listCollections().toArray()
		const collectionNames = collectionList.map(obj => obj.name)
		console.log('collections: ', collectionNames)
		const allFoodBrands = collectionNames.map(async function (foodType) {
			console.log(foodType)
			let foodBrandFromDB = []
			try {
				foodBrandFromDB = await db.collection(foodType).find({}).toArray()
			} catch (error) {
				console.error('could not map food brands. ', error)
			}
			foodBrandFromDB['foodType'] = foodType
			console.log('getData: 35: ', foodBrandFromDB)
			return foodBrandFromDB
		})
		console.log(allFoodBrands)
		return await allFoodBrands
	} catch (e) {
		console.error('could not read from database. ', e)
	} finally {
		await mongoClient.close()
	}
}

async function fetchSingle() {
	const uri = process.env.MONGODB_URI
	const mongoClient: MongoClient = new MongoClient(uri)

	try {
		await mongoClient.connect()
		const db = mongoClient.db('food')
		// FIXME rename collection dry
		const dry = await db.collection('dry').find({}).toArray()
		return dry
	} catch (e) {
		console.error('could not read from database. ', e)
	} finally {
		await mongoClient.close()
	}
}
