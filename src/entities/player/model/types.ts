import { ObjectId } from 'mongodb';

export enum PlayerRole {
    player,
    captain,
    admin,
    owner,
}

export type Player = {
    _id?: ObjectId | string;
    steamId: number;
    name: string;
    realName: string | null;
    avatarUrl: string;
    roles: PlayerRole[];
};