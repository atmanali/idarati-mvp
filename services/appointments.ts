import { AppointmentsModel, UsersAppointmentsModel } from "@models/index";
import { useQuery } from "@tanstack/react-query";
import { formatResponse, initRequest } from "@utils/requestsUtils";


const baseRoute = 'api/appointments';

export const createAppointments = (appointment: AppointmentsModel, usersIds: string[]) => {
    const init = initRequest('post', {body:{appointment, usersIds}});
    return fetch(baseRoute, init).then(formatResponse<UsersAppointmentsModel[]>)//.then(json => json.data)
}

export const getAppointments = () => {
    const init = initRequest();
    return fetch(baseRoute, init).then(formatResponse<AppointmentsModel[]>).then(json => json.status===200 && json.data)
}

const appointmentsKey = 'appointmentsKey';

export const useAppointments = () => {
    const {data, isFetched} = useQuery({
        queryKey: [ appointmentsKey ],
        queryFn: async () => getAppointments(),
    })

    return { appointments: data, isFetched };
}