import { Prisma } from "@prisma/client";
import { query } from "prisma/client";

export default async function getUsers(params: Prisma.usersFindManyArgs) {
    return query(
        prisma => prisma.users.findMany(params)
    );
}