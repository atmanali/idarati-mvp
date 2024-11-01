import { Prisma } from "@prisma/client";
import { query } from "prisma/client";

export default async function updateUsers(params: Prisma.usersUpdateManyArgs) {
    return query(
        prisma => prisma.users.updateMany(params)
    );
}