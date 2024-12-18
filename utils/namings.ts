import { UsersModel } from "@models/index";

const capitalize = (str: string) => str.charAt(0).toUpperCase() + str.substring(1);
export const userName = (user: Partial<UsersModel>) => {
    return user?.last_name && user?.first_name
        ? `${user.last_name.toUpperCase()} ${capitalize(user.first_name)}`
        : undefined;
};

const areInSameWeek = (fixed: Date, other: Date) => {
    const [fy,fm,fd, fwd] = [fixed.getFullYear(), fixed.getMonth(), fixed.getDate(), fixed.getDay()];
    const [oy,om,od, owd] = [other.getFullYear(), other.getMonth(), other.getDate(), other.getDay()];
    return (fy == oy) && (fm == om) && (fd-fwd+1 == od-owd+1);
}

export const classNames = (classNamesList: string[]) => classNamesList.filter(className => !!className).join(' ');