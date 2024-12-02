import { hashPassword } from "@utils/crypting";
import { randomUUID } from "crypto";
import { isSuccessfulDataFetching, query } from "prisma/client";

/**
 * should add multiple users at once, still not the case
 */
export default async function createUsers(params: {data: any}) {
    let data = params.data;
    try {
        return await createOneUser(data);
    } catch {
        return false;
    }
}

const createOneUser = async (user: any) => {
    let role = user.role;
    user = {...user, role: undefined};
    const userCreated = await query(prisma => prisma.users.create({data: {
        id: randomUUID(),
        ...user,
        password: hashPassword(user.password),
        is_first_connection: true,
    }}));
    role = await query(prisma => prisma.roles.findFirst({where: {name: role}}));
    const userRoleAssociated = await query(
        prisma => prisma.users_roles.create({data: {
            user:{connect: {username: user.username}},
            role:{connect: {id: role.id}}
        }})
    )
    console.log(
        'userCreated , userRoleAssociated',
        isSuccessfulDataFetching(userCreated),
        isSuccessfulDataFetching(userRoleAssociated)
    );
    return isSuccessfulDataFetching(userCreated) && isSuccessfulDataFetching(userRoleAssociated);
}