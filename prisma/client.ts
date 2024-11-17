import { Prisma } from '@prisma/client';
import { PrismaClient } from '@prisma/client';

type MyPrismaClient = PrismaClient<{
    omit: {
        users: {
            password: true;
            session_token: true;
        };
    };
}, never>;

const prisma = new PrismaClient({
    omit: {
        users: {
            password: true,
            session_token: true,
        }
    }
});

const failedDataFetching = 'dataFetchingFailed'
const handlePrismaError = (error: Error ) => {
    console.log(error);
    return failedDataFetching;
}

export const query = async (func: (param: MyPrismaClient) => Prisma.PrismaPromise<any>) => {
    let prismaResponse;
    try {
        prisma.$connect;
        prismaResponse = await func(prisma);
    } catch (error) { return handlePrismaError(error) }
    prisma.$disconnect;
    return prismaResponse;
}
const totallyNullObject = (anyObject: any) => {
    for (const key in Object.keys(anyObject)){
        if (anyObject[key]) return false;
    }
    return true;
}
const isFailedDataFetching = ( dataAccessReponse: any ) => !dataAccessReponse || dataAccessReponse === failedDataFetching;
export const isSuccessfulDataFetching = ( dataAccessReponse: any ) => !isFailedDataFetching(dataAccessReponse);