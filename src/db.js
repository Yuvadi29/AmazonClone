import { MongoClient } from "mongodb";

const uri = process.env.MONGO_URL
// const options = {
//     useUnifiedTopology: true,
//     useNewUrlParser: true,
// };

let client;
let clientPromise;

if (!process.env.MONGO_URL) {
    throw new Error("Please Add your MongoURL to .env.local");
}

if (process.env.MONGO_URL === 'development') {
    // In development mode, use a global variable so that the value is preserved
    if (!global._mongoClientPromise) {
        client = new MongoClient(uri);
        global._mongoClientPromise = client.connect();
    }
    clientPromise = global._mongoClientPromise;
} else {
    // In production mode it is best not to use global variable
    client = new MongoClient(uri);
    clientPromise = client.connect();
}

export default clientPromise;