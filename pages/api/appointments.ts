import createAppointment from "@dataServices/appointments/createAppointments";
import deleteAppointments from "@dataServices/appointments/deleteAppointments";
import getAppointments from "@dataServices/appointments/getAppointments";
import updateAppointments from "@dataServices/appointments/updateAppointments";
import getUsers from "@dataServices/users/getUsers";
import createUsersAppointments from "@dataServices/usersAppointments/createUsersAppointments";

import { NextApiRequest, NextApiResponse } from "next";
import { isSuccessfulDataFetching } from "prisma/client";

export default async function (req: NextApiRequest, res: NextApiResponse){
    switch (req.method) {
        case 'GET':
            let { params } = req.query;
            params = (params as string);
            const gotAppointments = await getAppointments(params ? JSON.parse(params) : undefined);
            res.status(isSuccessfulDataFetching(gotAppointments) ? 200 : 500).send({ data: gotAppointments });
            break;
        case 'POST':
            let {appointment, usersIds} = req.body;
            const [ username ] = req.headers.authorization.split(';');
            usersIds = usersIds?.length
                ? [
                    ...usersIds,
                    (await getUsers({ select: {id: true}, where: {username}}))[0]?.id
                ] : [
                    (await getUsers({select: {id: true}, where: {username}}))[0]?.id
                ];
            const createdAppointment = await createAppointment(appointment);
            const relatedUsers = usersIds?.length ? (
                await createUsersAppointments(
                    usersIds.map( userId => ({user_id: userId, appointment_id: createdAppointment?.id}) )
                )
            ) : null;
            res.status(isSuccessfulDataFetching(relatedUsers) || Boolean(createdAppointment) ? 200 : 500).json({ data: createdAppointment });
            break;
        case 'PATCH':
            const updatedAppointments = await updateAppointments(req.body);
            res.status(isSuccessfulDataFetching(updatedAppointments) ? 200 : 500).json({ data: updatedAppointments });
            break;
        case 'DELETE':
            const deletedAppointments = await deleteAppointments(req.body);
            res.status(isSuccessfulDataFetching(deletedAppointments) ? 200 : 500).json({ data: deletedAppointments });
            break;
    }
}