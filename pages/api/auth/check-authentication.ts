import { hashMyToken } from '@dataServices/auth/sessionToken';
import type { NextApiRequest, NextApiResponse } from 'next';
import { isSuccessfulDataFetching, query } from 'prisma/client';


export default async function handler( req: NextApiRequest, res: NextApiResponse) {
    if (req.method != 'GET') res.status(400).json({error: 'bad request'});
    const [username, session_token] = req.headers?.authorization.split(';');

    const checkedAuthenticatedUser = await query(
        prisma => prisma.users.findFirst({
            where: {
                username,
                session_token: hashMyToken(session_token),
            }
        })
    )
    if ( !isSuccessfulDataFetching(checkedAuthenticatedUser) ) res.status(401).json({ data: {error: 'Bad credentials'} });
    const data = await query(
        prisma => prisma.logs.findFirst({
            where: {
                author: {username},
                crud_action: 'update',
                affected_table_name: 'users',
                affected_fields_names: 'session_token'
            },
            select: { date: true },
            orderBy: { id: 'desc' }
        })
    )

    if (isSuccessfulDataFetching(data)) {
        const expires = 1000*60*parseInt(process.env.NEXT_PUBLIC_TOKEN_EXPIRES as string);
        const connected = ( expires + new Date(data.date).getTime() ) > Date.now();
        res.status(200).json({ data: { connected } })
    }
    else {
        res.status(401).json({ data: { error: 'Bad credentials' } })
    }
}