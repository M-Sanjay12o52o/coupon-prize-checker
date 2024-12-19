import { MongoClient, ServerApiVersion } from "mongodb";
const uri = process.env.MONGO_DB_URL;

const client = new MongoClient(uri as string, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

let isConnected = false;

export async function connectToDatabase() {
    if (!isConnected) {
        await client.connect();
        isConnected = true;
        console.log("Connected to MondoDB");
    }
    return client;
}
