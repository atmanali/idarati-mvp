import { Prisma } from "@prisma/client";
import { query } from "prisma/client";

export default async function createRoles(params: Prisma.rolesCreateManyArgs) {
    return query(
        prisma => prisma.roles.createMany(params)
    );
}