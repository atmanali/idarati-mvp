import { AppointmentsModel, UsersAppointmentsModel } from "@models/index";
import { Prisma } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";
import { formatResponse, initRequest } from "@utils/requestsUtils";


const baseRoute = '/api/appointments';

export const createAppointments = (appointment: AppointmentsModel, usersIds: string[]) => {
    const init = initRequest('post', {body:{appointment, usersIds}});
    return fetch(baseRoute, init).then(formatResponse<UsersAppointmentsModel[]>)//.then(json => json.data)
}

export const getAppointments = (params?: Prisma.appointmentsFindManyArgs) => {
    const init = initRequest();
    const route = (params != undefined) ? baseRoute+`?params=${JSON.stringify(params)}` : baseRoute;
    return fetch(route, init).then(formatResponse<AppointmentsModel[]>).then(json => json.status===200 && json.data)
}

export const appointmentsKey = 'appointmentsKey';

export const useAppointments = (params?: Prisma.appointmentsFindManyArgs) => {
    const {data, isFetched, refetch} = useQuery({
        queryKey: [ appointmentsKey ],
        queryFn: async () => getAppointments(params),
    })

    return { appointments: data, isFetched, refetch };
}