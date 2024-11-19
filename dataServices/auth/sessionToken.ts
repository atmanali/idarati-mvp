import { hashMyToken, randomStringOfLength } from "@utils/crypting";

export const generateSessionToken = (username: string) => {
    const randomPart = randomStringOfLength(471);
    return hashMyToken(randomPart + username);
}