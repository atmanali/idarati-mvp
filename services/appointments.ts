import { AppointmentsModel, UsersAppointmentsModel } from "@models/index";
import { formatResponse, initRequest } from "@utils/requestsUtils";


const baseRoute = 'api/appointments';

export const createAppointments = (appointment: AppointmentsModel, usersIds: string[]) => {
    console.log({appointments: appointment, usersIds});
    const init = initRequest('post', {body:{appointment, usersIds}});
    return fetch(baseRoute, init).then(formatResponse<UsersAppointmentsModel[]>)//.then(json => json.data)
}