import type { IncomingMessage, ServerResponse } from 'http'

import { MongoClient } from 'mongodb'
import { config } from 'dotenv'

export default async (req: IncomingMessage, res: ServerResponse) => {
	const uri = process.env.MONGODB_URI
	const mongoClient: MongoClient = new MongoClient(uri)

	await mongoClient.connect()
	const db = mongoClient.db('food')

	try {
		await dropCollection(db, 'dry')
		await addData(db, 'dry', dryFood)
		await dropCollection(db, 'wet')
		await addData(db, 'wet', wetFood)
	} catch (e) {
		console.error('could not read from database. ', e)
	} finally {
		await mongoClient.close()
	}

	res.writeHead(200, { 'Content-Type': 'application/json' })
	res.end()
}

const royalCaninCare = {
	name: 'Royal Canin Care Hair&Skin',
	recommendations: [
		{
			weight: 3,
			ideal: 41,
			overweight: 33,
		},
		{
			weight: 4,
			ideal: 50,
			overweight: 40,
		},
		{
			weight: 5,
			ideal: 59,
			overweight: 47,
		},
		{
			weight: 6,
			ideal: 67,
			overweight: 53,
		},
	],
	type: 'dry',
}
const royalCaninSterilised = {
	name: 'Royal Canin Regular Sterilised 37',
	recommendations: [
		{
			weight: 3,
			ideal: 47,
			overweight: 37,
		},
		{
			weight: 4,
			ideal: 57,
			overweight: 46,
		},
		{
			weight: 5,
			ideal: 67,
			overweight: 54,
		},
		{
			weight: 6,
			ideal: 76,
			overweight: 61,
		},
	],
	type: 'dry',
}
const shebaBig = {
	name: 'Sheba Slices',
	recommendations: [
		{
			weight: 3,
			ideal: 3,
			overweight: 4,
		},
		{
			weight: 4,
			ideal: 4,
			overweight: 5,
		},
		{
			weight: 5,
			ideal: 5,
			overweight: 6,
		},
		{
			weight: 6,
			ideal: 6,
			overweight: 7,
		},
	],
	type: 'wet',
}
const dryFood = [royalCaninCare, royalCaninSterilised]
const wetFood = [shebaBig]

async function addData(db, collection, data) {
	await db.collection(collection).insertMany(data)
}

async function dropCollection(db, collection) {
	await db.collection(collection).drop()
}
