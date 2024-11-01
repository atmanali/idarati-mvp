import { LogsModel } from "@models/index";
import { query } from "prisma/client";

export default async function createLogs(logs: LogsModel[]) {
    return query(
        prisma => prisma.logs.createMany({data: logs})
    );
}