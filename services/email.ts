import { userName } from "@utils/namings";
import Mailjet from "node-mailjet";
import { query } from "prisma/client";

const mailjet = Mailjet.apiConnect(
    process.env.MAILJET_API_KEY,
    process.env.MAILJET_SECRET_KEY,
);

export const sendEmail = async (username: string, newPassword: string) => {
    const user = await userFromUsername(username);
    if (!user?.email) return false;
    const request = mailjet
        .post('send', { version: 'v3.1' })
        .request({
        Messages: [
            {
            From: {
                Email: "abdalahalia7@gmail.com",
                Name: "iDarati emailing bot"
            },
            To: [
                {
                Email: user?.email,
                Name: userName(user)
                }
            ],
            Subject: "Votre nouveau mot de passe est arrivé!",
            TextPart: `Bonjour ${userName(user)}, Vous avez demandé un changement de mot de passe!`,
            HTMLPart: "<h3>Dear passenger 1, welcome to <a href=\"https://www.mailjet.com/\">Mailjet</a>!</h3><br />"
                        + newPassword
            }
        ]
        })
    return await request
}

const userFromUsername = async (username: string) => query(
    prisma => prisma.users.findFirst({where: {username}})
)
