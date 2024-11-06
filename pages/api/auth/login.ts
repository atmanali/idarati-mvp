import type { NextApiRequest, NextApiResponse } from 'next';
import { isSuccessfulDataFetching, query } from 'prisma/client';
 
export default async function handler( req: NextApiRequest, res: NextApiResponse) {
  if (req.method != 'POST') res.status(400).json({error: 'bad request'});
  const {username, password} = req.body;
  const foundUser = await query(
    prisma => prisma.users.findFirst({
      where: {
        username: username,
        password: password
      }
    })
  )
  if (isSuccessfulDataFetching(foundUser)) res.status(200).json({data: foundUser});
  else res.status(403).json({error: 'you do not exist buddy'});
}