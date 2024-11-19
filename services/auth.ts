import { useQuery } from "@tanstack/react-query";
import { formatResponse, initRequest } from "../utils/requestsUtils";
import { checkAuthentication } from "@utils/authUtils";

export const authKey = 'authenticate';
export type AuthProps = {
    session_token?: string;
    user?: any;
    session_expired?: boolean;
}

export const authenticate = async (username: string, password: string) : Promise<AuthProps> => {
    const route = 'api/auth/login';
    const init = initRequest('post', {
        body: { username, password }
    });

    return fetch(route, init).then(formatResponse<AuthProps>).then((jsonFormat) => jsonFormat.data);
}

export const usernameCheck = async (username: string) => {
    const route = `api/auth/check-authentication?username=${username}`;
    const init = initRequest('get')

    return fetch(route, init).then(formatResponse<{isValidUsername: boolean}>).then(json => json.data.isValidUsername);
}

export const authenticationCheck = async () => {
    const route = 'api/auth/check-authentication';
    const init = initRequest('get');

    return fetch(route, init).then(formatResponse<{connected: boolean}>).then(json => json.data.connected);
}

const useAuth = () => {
    const {data, isFetched, refetch} = useQuery({
        queryKey: [authKey],
        queryFn: checkAuthentication,
        initialData: {
            session_expired: true
        },
        refetchInterval: 1000*60*parseInt(process.env.NEXT_PUBLIC_TOKEN_EXPIRES as string),
    })

    return {isFetched, data, refetch};
}
export default useAuth;