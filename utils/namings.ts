import { UsersModel } from "@models/index";

const capitalize = (str: string) => str.charAt(0).toUpperCase() + str.substring(1);
export const userName = (user: Partial<UsersModel>) => {
    return user?.last_name && user?.first_name
        ? `${user.last_name.toUpperCase()} ${capitalize(user.first_name)}`
        : undefined;
};

export const classNames = (classNamesList: string[]) => classNamesList.filter((className) => !!className).join(' ')