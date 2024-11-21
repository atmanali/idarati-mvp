import { createHmac, randomBytes } from "node:crypto";
import { totalRegex } from "./regex";


export const hashMyToken = (toBeHashed: string) =>
    createHmac('sha512', process.env.TOKEN_HASH_KEY).update(toBeHashed).digest('hex')

export const randomStringOfLength = (length: number) => {
    randomBytes(length).toString('hex');
}

export const hashPassword = (password: string) => createHmac('sha512', process.env.PASSWORD_HASH_KEY).update(password).digest('hex')

const randomInteger = (min: number, max: number) =>
    Math.floor(Math.random() * (max - min + 1)) + min

export const randomPassword = (length: number) => {
    const passwordLength = length>11 ? length : 12;
    let password = '';
    while (!password){
        const arr = [];
        for (let i=0; i<passwordLength; i++) {
            arr.push(
                String.fromCharCode(randomInteger(32, 125))
            );
        }
        if (totalRegex.test(arr.join(''))) password=arr.join('');
    }
    return password;
}