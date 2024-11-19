import { ObjectId } from "mongodb";

enum PlayerRoles {
    player,
    captain,
    admin,
    owner,
}

export type Player = {
    id?: ObjectId;
    steamId: number;
    name: string;
    realName: string | null;
    avatarUrl: string;
    role: PlayerRoles;
};