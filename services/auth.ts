import { useQuery } from "@tanstack/react-query";
import { initRequest } from "../utils/requestsUtils";
import { query } from "prisma/client";

export const authKey = 'authenticate';

export const authenticate = async (username: string, password: string) => {
    const route = 'api/auth/login';
    const init = initRequest('post', {
        body: { username, password }
    });

    return fetch(route, init);
}

const updateSession = async (username: string) => {
    const ok = await query(
        prisma => prisma.users.update({
            data: {session_token: ''},
            where: { username },
        })
    )
}

const useAuth = (username: string, password: string) => {
    const { data, isFetched } = useQuery({
        queryKey: [authKey],
        queryFn: async () => await authenticate(username, password),
        refetchInterval:
        1000 * 60 * parseInt(process.env.NEXT_PUBLIC_TOKEN_EXPIRES as string),
      refetchIntervalInBackground: true,
    })
    return {
        session_token: data,
        isFetched
    }
}

export default useAuth;