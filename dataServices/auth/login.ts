import { isSuccessfulDataFetching, query } from "prisma/client"
import { hashMyToken } from "./sessionToken"

export const saveSessionTokenFor = async (sessionToken: string, user: any) => {
    const session_token = hashMyToken(sessionToken);
    const is_connected = true;
    const username = user?.username;
    const authenticationSucceed = await query(
        prisma => prisma.users.update({
            data: { session_token, is_connected },
            where: { username },
        })
    )
    isSuccessfulDataFetching(authenticationSucceed) &&
    console.log(
        await query(
            prisma => prisma.logs.create({
                data: {
                    author_id: user?.id,
                    crud_action: 'update',
                    affected_iteration_id: user?.id,
                    affected_table_name: 'users',
                    affected_fields_names: 'session_token',
                    date: new Date(),
                }
            })
        )
    )

    return authenticationSucceed;
}