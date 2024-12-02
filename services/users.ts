import { UsersModel } from "@models/index";
import { Prisma } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";
import { formatResponse, initRequest } from "utils/requestsUtils";

const apiRoute = "api/users";

export const createUsers = (params: Prisma.usersCreateManyArgs) => {
    const init = initRequest('post', { body: params });
    return fetch(apiRoute, init).then(formatResponse<string>);
}

export const getUsers = (params?: Prisma.usersFindManyArgs) => {
    let route = apiRoute;
    if (params != undefined) route += `?params=${JSON.stringify(params)}`;
    const init = initRequest('get');
    return fetch(route, init).then(formatResponse<Partial<UsersModel>[]>).then(json=>json.data);
}
export const updateUsers = (params: Prisma.usersUpdateManyArgs) => {
    const init = initRequest('patch', { body: params });
    return fetch(apiRoute, init);
}
export const deleteUsers = (params: Prisma.usersDeleteManyArgs) => {
    const init = initRequest('delete', { body: params });
    return fetch(apiRoute, init).then(formatResponse);
}

export const changePassword = (username: string) => {
    const route = `api/auth/reset-password?username=${username}`;
    const init = initRequest('get');

    return fetch(route, init).then(formatResponse<{password: string}>).then(json => json.data.password);
}

export const usersKey = 'usersKey'
export const useUsers = () => {
    const { data, isFetched, refetch } = useQuery({
        queryKey: [usersKey],
        queryFn: () => getUsers()
    })
    return {users: data, isFetched, refetch}
}