import createAppointments from "@dataServices/appointments/createAppointments";
import deleteAppointments from "@dataServices/appointments/deleteAppointments";
import getAppointments from "@dataServices/appointments/getAppointments";
import updateAppointments from "@dataServices/appointments/updateAppointments";

import { NextApiRequest, NextApiResponse } from "next";
import { isSuccessfulDataAccess } from "utils/requestsUtils";

export default async function (req: NextApiRequest, res: NextApiResponse){
    switch (req.method) {
        case 'GET':
            let { params } = req.query;
            params = (params as string);
            const gotAppointments = await getAppointments(params ? JSON.parse(params) : undefined);
            res.status(isSuccessfulDataAccess(gotAppointments) ? 200 : 500).send({ data: gotAppointments });
            break;
        case 'POST':
            const createdAppointments = await createAppointments(req.body);
            res.status(isSuccessfulDataAccess(createdAppointments) ? 200 : 500).json({ data: createdAppointments });
            break;
        case 'PATCH':
            const updatedAppointments = await updateAppointments(req.body);
            res.status(isSuccessfulDataAccess(updatedAppointments) ? 200 : 500).json({ data: updatedAppointments });
            break;
        case 'DELETE':
            const deletedAppointments = await deleteAppointments(req.body);
            res.status(isSuccessfulDataAccess(deletedAppointments) ? 200 : 500).json({ data: deletedAppointments });
            break;
    }
}