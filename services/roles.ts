import { Prisma } from "@prisma/client";
import { initRequest } from "utils/requestsUtils";

const apiRoute = "api/roles";

export const createRoles = (params: Prisma.rolesCreateManyArgs) => {
    const init = initRequest('post', { body: params });
    return fetch(apiRoute, init);
}

export const getRoles = (params?: Prisma.rolesFindManyArgs) => {
    let route = apiRoute;
    if (params != undefined) route += `?params=${JSON.stringify(params)}`;
    const init = initRequest('get');
    return fetch(route, init);
}
export const updateRoles = (params: Prisma.rolesUpdateManyArgs) => {
    const init = initRequest('patch', { body: params });
    return fetch(apiRoute, init);
}
export const deleteRoles = (params: Prisma.rolesDeleteManyArgs) => {
    const init = initRequest('delete', { body: params });
    return fetch(apiRoute, init);
}