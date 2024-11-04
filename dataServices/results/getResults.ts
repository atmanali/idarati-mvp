import { Prisma } from "@prisma/client";
import { query } from "prisma/client";

export default async function getResults(params: Prisma.resultsFindManyArgs) {
    return query(
        prisma => prisma.results.findMany(params)
    );
}