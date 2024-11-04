import { Prisma } from "@prisma/client";
import { query } from "prisma/client";

export default async function updateRoles(params: Prisma.rolesUpdateManyArgs) {
    return query(
        prisma => prisma.roles.updateMany(params)
    );
}