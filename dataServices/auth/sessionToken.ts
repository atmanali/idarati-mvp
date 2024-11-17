import { randomBytes, createHmac } from "node:crypto";

export const hashMyToken = (toBeHashed: string) => createHmac('sha512', process.env.SECRET_GENERATOR).update(toBeHashed).digest('hex')
export const generateSessionToken = (username: string) => {
    const randomPart = randomBytes(471).toString('hex');
    return hashMyToken(randomPart+username);
}