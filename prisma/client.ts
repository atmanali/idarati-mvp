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

const dataFetchingFailed = 'dataFetchingFailed'
const handlePrismaError = (error: Error & {code: string}) => {
    (error instanceof Prisma.PrismaClientKnownRequestError)
        ? console.log(`${new Date()} —— error with prisma request`)
        : console.log(`${new Date()} —— unknown error with prisma request`)
    console.log(error)
    return dataFetchingFailed;
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
const allFieldsAreWellDefined = (anyObject: any) => {
    if (!Boolean(anyObject)) return false;
    let output = true;
    Object.keys(anyObject)
        .map((key: any) => output = output && Boolean(anyObject[key]))
    return output;
}
export const isSuccessfulDataFetching = ( dataAccessReponse: any ) =>
    allFieldsAreWellDefined(dataAccessReponse) && dataAccessReponse != dataFetchingFailed