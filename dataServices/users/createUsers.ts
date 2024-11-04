import { UsersModel } from "@models/index";
import { Prisma } from "@prisma/client";
import { query } from "prisma/client";

export default async function createUsers(params: Prisma.usersCreateManyArgs) {
    return query(
        prisma => prisma.users.createMany(params)
    );
}