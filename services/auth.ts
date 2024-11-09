import { useQuery } from "@tanstack/react-query";
import { initRequest } from "../utils/requestsUtils";
import { query } from "prisma/client";

export const authKey = 'authenticate';

export const authenticate = async (username: string, password: string) : Promise<{session_token: string; user: any}> => {
    const route = 'api/auth/login';
    const init = initRequest('post', {
        body: { username, password }
    });

    return fetch(route, init).then(async (res) => (await res.json()).data);
}

const updateSession = async (username: string) => {
    const ok = await query(
        prisma => prisma.users.update({
            data: {session_token: ''},
            where: { username },
        })
    )
}

/**
 * 
 * @param username to be deleted
 * @param password to be deleted
 * @returns { session_token: string, user: UserModel, isFetched: boolean }
 * 
 * Params will be moved to change the behavior of this hook
 *  It should check if there is a session token in cache
 *      If there is
 *          check valididty (send the token in a POST request to the backend)
 *          If token is valid
 *              nothing to do
 *          Else
 *              redirect to login page
 *      Else
 *          redirect to login page
 */
const useAuth = (username: string, password: string) => {
    const { data, isFetched } = useQuery({
        queryKey: [authKey],
        queryFn: async () => await authenticate(username, password),
        refetchInterval:
        1000 * 60 * parseInt(process.env.NEXT_PUBLIC_TOKEN_EXPIRES as string),
      refetchIntervalInBackground: true,
    })
    const { session_token, user } = data;
    //console.log(data);
    return {
        session_token,
        user,
        isFetched
    }
}

// Implement mutators for useAuth. One mutator for login functionnality, another for token verification

export default useAuth;