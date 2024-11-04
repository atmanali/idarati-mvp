import { Prisma } from '@prisma/client';
import { PrismaClient } from '@prisma/client';

type MyPrismaClient = PrismaClient<{
    omit: {
        users: {
            password: true;
        };
    };
}, never>;

const prisma = new PrismaClient({
    omit: {
        users: {
            password: true,
        }
    }
});

const handlePrismaError = (error: Error & {code: string}) => {
    (error instanceof Prisma.PrismaClientKnownRequestError)
        ? console.log(`${new Date()} —— error with prisma request`)
        : console.log(`${new Date()} —— unknown error with prisma request`)
    console.log(error)
    return 'Error'
}

export const query = async (func: (param: MyPrismaClient) => Prisma.PrismaPromise<any>) => {
    let output: any;
    try {
        prisma.$connect;
        output = await func(prisma);
    } catch (error) { output = handlePrismaError(error) }
    prisma.$disconnect;

    return output;
}