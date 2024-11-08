import { match } from "@/src/entities/match/model";
import { connectToDb } from "..";

const collectionName = "matches"

export async function getMatches(): Promise<match[]> {
    const db = await connectToDb();
    const collection = db.collection<match>(collectionName);

    const matches = await collection
        .find()
        .toArray()

    if (!matches) throw new Error("Error on getting players");

    return matches;
}

export async function createMatch(match: match) {
    const db = await connectToDb();
    const collection = db.collection<match>(collectionName);

    const res = await collection.insertOne(match);

    return res;
}
