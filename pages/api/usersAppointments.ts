import createUsersAppointments from "@dataServices/usersAppointments/createUsersAppointments";
import deleteUsersAppointments from "@dataServices/usersAppointments/deleteUsersAppointments";
import getUsersAppointments from "@dataServices/usersAppointments/getUsersAppointments";
import updateUsersAppointments from "@dataServices/usersAppointments/updateUsersAppointments";

import { NextApiRequest, NextApiResponse } from "next";
import { isSuccessfulDataFetching } from "prisma/client";

export default async function (req: NextApiRequest, res: NextApiResponse){
    switch (req.method) {
        case 'GET':
            let { params } = req.query;
            params = (params as string);
            const gotUsersAppointments = await getUsersAppointments(params ? JSON.parse(params) : undefined);
            res.status(isSuccessfulDataFetching(gotUsersAppointments) ? 200 : 500).send({ data: gotUsersAppointments });
            break;
        case 'POST':
            const createdUsersAppointments = await createUsersAppointments(req.body);
            res.status(isSuccessfulDataFetching(createdUsersAppointments) ? 200 : 500).json({ data: createdUsersAppointments });
            break;
        case 'PATCH':
            const updatedUsersAppointments = await updateUsersAppointments(req.body);
            res.status(isSuccessfulDataFetching(updatedUsersAppointments) ? 200 : 500).json({ data: updatedUsersAppointments });
            break;
        case 'DELETE':
            const deletedUsersAppointments = await deleteUsersAppointments(req.body);
            res.status(isSuccessfulDataFetching(deletedUsersAppointments) ? 200 : 500).json({ data: deletedUsersAppointments });
            break;
    }
}