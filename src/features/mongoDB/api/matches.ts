import { Match } from "@/src/entities/match/model";
import { connectToDb } from "./general";
import { ObjectId } from "mongodb";

const collectionName = "matches";

export async function getMatchesWithAggregate(): Promise<Match[]> {
    'use server'

    const db = await connectToDb()
    const collection = db.collection<Match>(collectionName);

    const cursor = await collection.aggregate([
        {
            $lookup: {
                from: "teams",
                localField: "teamA",
                foreignField: "_id",
                as: "teamA",
            },
        },
        { $unwind: "$teamA" },
        {
            $lookup: {
                from: "teams",
                localField: "teamB",
                foreignField: "_id",
                as: "teamB",
            },
        },
        { $unwind: "$teamB" },
        {
            $lookup: {
                from: "players",
                localField: "teamA.players",
                foreignField: "_id",
                as: "teamA.players",
            },
        },
        {
            $lookup: {
                from: "players",
                localField: "teamB.players",
                foreignField: "_id",
                as: "teamB.players",
            },
        },
    ]);

    const matches = await cursor.toArray();

    if (!matches)
        throw new Error(`failed to get matches`);
    
    return matches as Match[];
}

export async function getMatches(): Promise<Match[]> {
    'use server'

    const db = await connectToDb()
    const collection = db.collection<Match>(collectionName);

    const cursor = await collection.find()

    const matches = await cursor.toArray();

    if (!matches)
        throw new Error(`failed to get matches`);
    
    return matches as Match[];
}

export async function postMatch(match: Match) {
    'use server'

    const db = await connectToDb()
    const collection = db.collection<Match>(collectionName);

    const res = await collection.insertOne(match);

    return res;
}

export async function getMatchWithAggregate(id: ObjectId): Promise<Match> {
    "use server"
    
    const db = await connectToDb()
    const collection = db.collection<Match>(collectionName);

    const cursor = await collection.aggregate([
        { $match: { _id: id } },
        {
            $lookup: {
                from: "teams",
                localField: "teamA",
                foreignField: "_id",
                as: "teamA",
            },
        },
        { $unwind: "$teamA" },
        {
            $lookup: {
                from: "teams",
                localField: "teamB",
                foreignField: "_id",
                as: "teamB",
            },
        },
        { $unwind: "$teamB" },
        {
            $lookup: {
                from: "players",
                localField: "teamA.players",
                foreignField: "_id",
                as: "teamA.players",
            },
        },
        {
            $lookup: {
                from: "players",
                localField: "teamB.players",
                foreignField: "_id",
                as: "teamB.players",
            },
        },
    ]);

    const match = await cursor.toArray();

    if (!match)
        throw new Error(`failed to get match with id "${id.toString()}"`);
    
    return match[0] as Match;
}

export async function getMatch(id: ObjectId): Promise<Match> {
    "use server"
    
    const db = await connectToDb()
    const collection = db.collection<Match>(collectionName);

    const match = await collection.findOne({_id: id})

    if (!match)
        throw new Error(`failed to get match with id "${id.toString()}"`);
    
    return match;
}