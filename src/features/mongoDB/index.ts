import { Db, MongoClient } from "mongodb";

const url = "mongodb://localhost:27017";
const dbName = "lanpicker";

export async function connectToDb(): Promise<Db> {
    const client = new MongoClient(url);
    await client.connect();
    console.log("Connected successfully to server");

    return client.db(dbName);
}

export * from './api'