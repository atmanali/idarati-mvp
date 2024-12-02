import { hashPassword } from "@utils/crypting";
import { randomUUID } from "crypto";
import { isSuccessfulDataFetching, query } from "prisma/client";

export default async function createUsers(params: {data: any}) {
    let data = params.data;
    const isArray = Array.isArray(data);
    if (!isArray) { data = [data] }
    const created = data
        .map(createOneUser)
        .map(isSuccessfulDataFetching)
    return !created.includes(false);
}

const createOneUser = async (user: any) => {
    let role = user.role;
    user = {...user, role: undefined};
    const output = await query(prisma => prisma.users.create({data: {
        id: randomUUID(),
        ...user,
        password: hashPassword(user.password),
        is_first_connection: true,
    }}));
    role = await query(prisma => prisma.roles.findFirst({where: {name: role}}));
    output.push(
        isSuccessfulDataFetching(
            await query(
                prisma => prisma.users_roles.create({data: {
                    user:{connect: {username: user.username}},
                    role:{connect: {id: role.id}}
                }})
            )
        )
    )

    return output;
}