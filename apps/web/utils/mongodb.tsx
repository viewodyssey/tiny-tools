import { MongoClient } from 'mongodb'

if (!process.env.EMAILDB_URI) {
	throw new Error('Invalid/Missing environment variable: "EMAILDB_URI"')
}

const uri = process.env.EMAILDB_URI
const options = {}

let client: any
let clientPromise: Promise<MongoClient>

client = new MongoClient(uri, options)
clientPromise = client.connect()
// Export a module-scoped MongoClient promise. By doing this in a
// separate module, the client can be shared across functions.
export default clientPromise
