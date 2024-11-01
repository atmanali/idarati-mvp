import { Prisma } from "@prisma/client";
import { query } from "prisma/client";

export default async function deleteResults(params: Prisma.resultsDeleteManyArgs) {
    return query(
        prisma => prisma.results.deleteMany(params)
    );
}