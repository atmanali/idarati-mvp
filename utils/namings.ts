import { UsersModel } from "@models/index";

const capitalize = (str: string) => str.charAt(0).toUpperCase() + str.substring(1);
export const userName = (user: Partial<UsersModel>) => {
    return user?.last_name && user?.first_name
        ? `${user.last_name.toUpperCase()} ${capitalize(user.first_name)}`
        : undefined;
};


const hours = {
    '8': 'eight',
    '9': 'nine',
    '10': 'ten',
    '11': 'eleven',
    '12': 'twelve',
    '13': 'thirteen',
    '14': 'fourteen',
    '15': 'fifteen',
    '16': 'sixteen'
};
const days = {
    '1': 'mon',
    '2': 'tue',
    '3': 'wed',
    '4': 'thu',
    '5': 'fri',
    '6': 'sat',
    '0': 'sun'
};
export const months = {
    '0': 'janvier',
    '1': 'février',
    '2': 'mars',
    '3': 'avril',
    '4': 'mai',
    '5': 'juin',
    '6': 'juillet',
    '7': 'août',
    '8': 'septembre',
    '9': 'octobre',
    '10': 'novembre',
    '11': 'décembre',
}
const areInSameWeek = (fixed: Date, other: Date) => {
    const [fy,fm,fd, fwd] = [fixed.getFullYear(), fixed.getMonth(), fixed.getDate(), fixed.getDay()];
    const [oy,om,od, owd] = [other.getFullYear(), other.getMonth(), other.getDate(), other.getDay()];
    return (fy == oy) && (fm == om) && (fd-fwd+1 == od-owd+1);
}
export const arrayOfCalendarClassNames = [ 'eightsun', 'eightmon', 'eighttue', 'eightwed', 'eightthu', 'eightfri', 'eightsat', 'ninesun', 'ninemon', 'ninetue', 'ninewed', 'ninethu', 'ninefri', 'ninesat', 'tensun', 'tenmon', 'tentue', 'tenwed', 'tenthu', 'tenfri', 'tensat', 'elevensun', 'elevenmon', 'eleventue', 'elevenwed', 'eleventhu', 'elevenfri', 'elevensat', 'twelvesun', 'twelvemon', 'twelvetue', 'twelvewed', 'twelvethu', 'twelvefri', 'twelvesat', 'thirteensun', 'thirteenmon', 'thirteentue', 'thirteenwed', 'thirteenthu', 'thirteenfri', 'thirteensat', 'fourteensun', 'fourteenmon', 'fourteentue', 'fourteenwed', 'fourteenthu', 'fourteenfri', 'fourteensat', 'fifteensun', 'fifteenmon', 'fifteentue', 'fifteenwed', 'fifteenthu', 'fifteenfri', 'fifteensat', 'sixteensun', 'sixteenmon', 'sixteentue', 'sixteenwed', 'sixteenthu', 'sixteenfri', 'sixteensat' ]

export const classNames = (classNamesList: string[]) => classNamesList.filter(className => !!className).join(' ');

export const dateToCalendarClassName = (date: Date) => {
    return hours[date?.getHours()]+days[date?.getDay()]
}