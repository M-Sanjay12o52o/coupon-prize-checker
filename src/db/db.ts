import { MongoClient, ServerApiVersion } from "mongodb";
const uri = "mongodb+srv://sanjayMERNDb:sanjayMERNDb@cluster1.re8rp8u.mongodb.net/?retryWrites=true&w=majority&appName=Cluster1";

const client = new MongoClient(uri, {
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
