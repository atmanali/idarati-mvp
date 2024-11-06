import createUsers from "@dataServices/users/createUsers";
import deleteUsers from "@dataServices/users/deleteUsers";
import getUsers from "@dataServices/users/getUsers";
import updateUsers from "@dataServices/users/updateUsers";
import { NextApiRequest, NextApiResponse } from "next";
import { isSuccessfulDataAccess } from "utils/requestsUtils";


export default async function (req: NextApiRequest, res: NextApiResponse<any>) {
    switch (req.method) {
        case 'GET':
            let { params } = req.query;
            params = (params as string);
            const gotUsers = await getUsers(params ? JSON.parse(params) : undefined);
            res.status(isSuccessfulDataAccess(gotUsers) ? 200 : 500).send({ data: gotUsers });
            break;
        case 'POST':
            const createdUsers = await createUsers(req.body);
            res.status(isSuccessfulDataAccess(createdUsers) ? 200 : 500).json({ data: createdUsers });
            break;
        case 'PATCH':
            const updatedUsers = await updateUsers(req.body);
            res.status(isSuccessfulDataAccess(updatedUsers) ? 200 : 500).json({ data: updatedUsers });
            break;
        case 'DELETE':
            const deletedUsers = await deleteUsers(req.body);
            res.status(isSuccessfulDataAccess(deletedUsers) ? 200 : 500).json({ data: deletedUsers });
            break;
    }
}