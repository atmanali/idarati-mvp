import { Prisma } from '@prisma/client';
import { PrismaClient } from '@prisma/client';

type MyPrismaClient = PrismaClient<{
    omit: {
        users: {
            password: true;
        };
    };
}, never>;

let prisma = new PrismaClient({
    omit: {
        users: {
            password: true,
        }
    }
});

const handlePrismaError = (error: Error) => {
    (error instanceof Prisma.PrismaClientKnownRequestError)
        ? console.log(`${new Date()} —— error with prisma request`)
        : console.log(`${new Date()} —— unknown error with prisma request`)
    console.log(error)
}

export const query = async (func: (param: MyPrismaClient) => void) => {
    try {
        return func(prisma);
    } catch (error) { handlePrismaError(error) }
}

export default prisma;