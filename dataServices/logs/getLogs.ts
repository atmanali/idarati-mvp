import { Prisma } from "@prisma/client";
import { query } from "prisma/client";

export default async function getLogs(params: Prisma.logsFindManyArgs) {
    return query(
        prisma => prisma.logs.findMany(params)
    );
}