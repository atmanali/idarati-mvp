import createUsers from "@dataServices/users/createUsers";
import deleteUsers from "@dataServices/users/deleteUsers";
import getUsers from "@dataServices/users/getUsers";
import updateUsers from "@dataServices/users/updateUsers";
import { NextApiRequest, NextApiResponse } from "next";
import { isSuccessfulDataFetching, query } from "prisma/client";


export default async function (req: NextApiRequest, res: NextApiResponse<any>) {
    switch (req.method) {
        case 'GET':
            let { params } = req.query;
            params = (params as string);
            const gotUsers = await getUsers(params ? JSON.parse(params) : undefined);
            res.status(isSuccessfulDataFetching(gotUsers) ? 200 : 500).send({ data: gotUsers });
            break;
        case 'POST':
            const isCreatedUsers = await createUsers(req.body);
            console.log({isCreatedUsers});
            res.status(isCreatedUsers ? 200 : 500).json({ data: isCreatedUsers ? 'CREATED' : 'ERROR' });
            break;
        case 'PATCH':
            const updatedUsers = await updateUsers(req.body);
            res.status(isSuccessfulDataFetching(updatedUsers) ? 200 : 500).json({ data: updatedUsers });
            break;
        case 'DELETE':
            const dissociateUsersFromRole = await query(
                prisma => prisma.users_roles.deleteMany({where: {user_id: req.body.where.id}})
            )
            if (dissociateUsersFromRole) {
                const deletedUsers = await deleteUsers(req.body);
                res.status(isSuccessfulDataFetching(deletedUsers) ? 200 : 500).json({ data: deletedUsers });
            }
            else res.status(500).json({data: null});
            break;
    }
}