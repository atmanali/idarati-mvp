import { Prisma } from "@prisma/client";
import { query } from "prisma/client";

export default async function deleteUsers(params: Prisma.usersDeleteManyArgs) {
    return query(
        prisma => prisma.users.deleteMany(params)
    );
}