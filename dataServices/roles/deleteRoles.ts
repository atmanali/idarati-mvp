import { Prisma } from "@prisma/client";
import { query } from "prisma/client";

export default async function deleteRoles(params: Prisma.rolesDeleteManyArgs) {
    return query(
        prisma => prisma.roles.deleteMany(params)
    );
}