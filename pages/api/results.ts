import createResults from "@dataServices/results/createResults";
import deleteResults from "@dataServices/results/deleteResults";
import getResults from "@dataServices/results/getResults";
import updateResults from "@dataServices/results/updateResults";

import { NextApiRequest, NextApiResponse } from "next";
import { isSuccessfulDataAccess } from "utils/requestsUtils";

export default async function (req: NextApiRequest, res: NextApiResponse){
    switch (req.method) {
        case 'GET':
            let { params } = req.query;
            params = (params as string);
            const gotResults = await getResults(params ? JSON.parse(params) : undefined);
            res.status(isSuccessfulDataAccess(gotResults) ? 200 : 500).send({ data: gotResults });
            break;
        case 'POST':
            const createdResults = await createResults(req.body);
            res.status(isSuccessfulDataAccess(createdResults) ? 200 : 500).json({ data: createdResults });
            break;
        case 'PATCH':
            const updatedResults = await updateResults(req.body);
            res.status(isSuccessfulDataAccess(updatedResults) ? 200 : 500).json({ data: updatedResults });
            break;
        case 'DELETE':
            const deletedResults = await deleteResults(req.body);
            res.status(isSuccessfulDataAccess(deletedResults) ? 200 : 500).json({ data: deletedResults });
            break;
    }
}