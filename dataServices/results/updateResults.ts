import { Prisma } from "@prisma/client";
import { query } from "prisma/client";

export default async function updateResults(params: Prisma.resultsUpdateManyArgs) {
    return query(
        prisma => prisma.results.updateMany(params)
    );
}