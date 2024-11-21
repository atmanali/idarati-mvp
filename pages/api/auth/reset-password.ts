import { randomPassword } from "@utils/crypting";
import { NextApiRequest, NextApiResponse } from "next";
import { isSuccessfulDataFetching, query } from "prisma/client";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'GET' && req.query?.username){
        const username = req.query.username as string;
        const password = randomPassword(0);
        const resetPassword = await query (
            prisma => prisma.users.update({
                data: { password },
                where: { username }
            })
        )
        if (isSuccessfulDataFetching(resetPassword)) {
            res.status(200).json({data: { password }})
        }
    }
    res.status(500).json({data:{}})
}