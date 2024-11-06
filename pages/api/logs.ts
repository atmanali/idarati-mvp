import createLogs from "@dataServices/logs/createLogs";
import getLogs from "@dataServices/logs/getLogs";

import { NextApiRequest, NextApiResponse } from "next";
import { isSuccessfulDataFetching } from "prisma/client";

export default async function (req: NextApiRequest, res: NextApiResponse){
    switch (req.method) {
        case 'GET':
            let { params } = req.query;
            params = (params as string);
            const gotLogs = await getLogs(params ? JSON.parse(params) : undefined);
            res.status(isSuccessfulDataFetching(gotLogs) ? 200 : 500).send({ data: gotLogs });
            break;
        case 'POST':
            const createdLogs = await createLogs(req.body);
            res.status(isSuccessfulDataFetching(createdLogs) ? 200 : 500).json({ data: createdLogs });
            break;
    }
}