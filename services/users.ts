import { Prisma } from "@prisma/client";
import { initRequest } from "utils/requestsUtils";

const apiRoute = "api/users";

export const createUsers = (params: Prisma.usersCreateManyArgs) => {
    const init = initRequest('post', { body: params });
    return fetch(apiRoute, init);
}

export const getUsers = (params?: Prisma.usersFindManyArgs) => {
    let route = apiRoute;
    if (params != undefined) route += `?params=${JSON.stringify(params)}`;
    const init = initRequest('get');
    return fetch(route, init);
}
export const updateUsers = (params: Prisma.usersUpdateManyArgs) => {
    const init = initRequest('patch', { body: params });
    return fetch(apiRoute, init);
}
export const deleteUsers = (params: Prisma.usersDeleteManyArgs) => {
    const init = initRequest('delete', { body: params });
    return fetch(apiRoute, init);
}