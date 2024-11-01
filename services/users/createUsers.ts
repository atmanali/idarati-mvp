import { UsersModel } from "@models/index";
import { query } from "prisma/client";

export default async function createUsers(users: UsersModel[]) {
    return query(
        prisma => prisma.users.createMany({data: users})
    );
}