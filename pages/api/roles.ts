import createRoles from "@dataServices/roles/createRoles";
import deleteRoles from "@dataServices/roles/deleteRoles";
import getRoles from "@dataServices/roles/getRoles";
import updateRoles from "@dataServices/roles/updateRoles";

import { NextApiRequest, NextApiResponse } from "next";
import { isSuccessfulDataAccess } from "utils/requestsUtils";

export default async function (req: NextApiRequest, res: NextApiResponse){
    switch (req.method) {
        case 'GET':
            let { params } = req.query;
            params = (params as string);
            const gotRoles = await getRoles(params ? JSON.parse(params) : undefined);
            res.status(isSuccessfulDataAccess(gotRoles) ? 200 : 500).send({ data: gotRoles });
            break;
        case 'POST':
            const createdRoles = await createRoles(req.body);
            res.status(isSuccessfulDataAccess(createdRoles) ? 200 : 500).json({ data: createdRoles });
            break;
        case 'PATCH':
            const updatedRoles = await updateRoles(req.body);
            res.status(isSuccessfulDataAccess(updatedRoles) ? 200 : 500).json({ data: updatedRoles });
            break;
        case 'DELETE':
            const deletedRoles = await deleteRoles(req.body);
            res.status(isSuccessfulDataAccess(deletedRoles) ? 200 : 500).json({ data: deletedRoles });
            break;
    }
}