import { saveSessionTokenFor } from '@dataServices/auth/login';
import { generateSessionToken } from '@dataServices/auth/sessionToken';
import type { NextApiRequest, NextApiResponse } from 'next';
import { isSuccessfulDataFetching, query } from 'prisma/client';
 
export default async function handler( req: NextApiRequest, res: NextApiResponse) {
  if (req.method != 'POST') res.status(400).json({error: 'bad request'});
  const {username, password} = req.body;
  const userExists = await query(
    prisma => prisma.users.count({ where: { username } })
  )
  if (isSuccessfulDataFetching(userExists)) {
    const user = await query(
      prisma => prisma.users.findFirst({ where: {username, password } })
    )
    const session_token = generateSessionToken(username);
    isSuccessfulDataFetching(await saveSessionTokenFor( session_token, user ))
      ? res.status(200).json({ data: { user, session_token } })
      : res.status(401).json({ error: 'bad credentials' })
  }
  else res.status(401).json({ error: 'you do not exist buddy' });
}