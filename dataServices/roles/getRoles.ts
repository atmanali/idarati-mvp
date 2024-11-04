import { Prisma } from "@prisma/client";
import { query } from "prisma/client";

export default async function getRoles(params: Prisma.rolesFindManyArgs) {
    return query(
        prisma => prisma.roles.findMany(params)
    );
}