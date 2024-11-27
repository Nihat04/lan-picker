import { Db, MongoClient } from 'mongodb';

const url = process.env.MONGODB_CONNECTION_STRING;
const dbName = 'lanpicker';

export let db: Db;

if (!url)
    throw new Error('.env file. Not configured MongoDB connection string');

const client = new MongoClient(url);

export async function connectToDb(): Promise<Db> {
    if (db) {
        return db;
    } else {
        try {
            await client.connect();
            db = client.db(dbName);
            console.log('Connected to database');
        } catch (err) {
            console.error('Failed to connect to database', err);
            process.exit(1);
        }
    }

    return db
}
