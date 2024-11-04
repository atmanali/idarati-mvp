import { ResultsModel } from "@models/index";
import { query } from "prisma/client";

export default async function createResults(results: ResultsModel[]) {
    return query(
        prisma => prisma.results.createMany({data: results})
    );
}