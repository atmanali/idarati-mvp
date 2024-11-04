import createLogs from "@dataServices/logs/createLogs";
import getLogs from "@dataServices/logs/getLogs";

import { NextApiRequest, NextApiResponse } from "next";
import { isSuccessfulDataAccess } from "utils/requestsUtils";

export default async function (req: NextApiRequest, res: NextApiResponse){
    switch (req.method) {
        case 'GET':
            let { params } = req.query;
            params = (params as string);
            const gotLogs = await getLogs(params ? JSON.parse(params) : undefined);
            res.status(isSuccessfulDataAccess(gotLogs) ? 200 : 500).send({ data: gotLogs });
            break;
        case 'POST':
            const createdLogs = await createLogs(req.body);
            res.status(isSuccessfulDataAccess(createdLogs) ? 200 : 500).json({ data: createdLogs });
            break;
    }
}