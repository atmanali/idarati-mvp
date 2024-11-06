import { initRequest } from "./requestsUtils";

export const authenticate = async (username: string, password: string) => {
    const route = 'api/auth/login';
    const init = initRequest('post', {
        body: { username, password }
    });

    return fetch(route, init);
}