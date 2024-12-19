import { AppointmentsModel } from "@models/index";

const hours = { '8': 'eight', '9': 'nine', '10': 'ten', '11': 'eleven', '12': 'twelve', '13': 'thirteen', '14': 'fourteen', '15': 'fifteen', '16': 'sixteen' };
export const days = { '1': 'mon', '2': 'tue', '3': 'wed', '4': 'thu', '5': 'fri', '6': 'sat', '0': 'sun' };
export const daysInFrench = { '1': 'Lun', '2': 'Mar', '3': 'Mer', '4': 'Jeu', '5': 'Ven', '6': 'Sam', '0': 'Dim' };
export const months = { '0': 'janvier', '1': 'février', '2': 'mars', '3': 'avril', '4': 'mai', '5': 'juin', '6': 'juillet', '7': 'août', '8': 'septembre', '9': 'octobre', '10': 'novembre', '11': 'décembre', };
export const monthsLengths = (year: number) => {
    const isLeapYear = !(year%4) && !!(year%100) || !(year%400);

    return { '0': 32, '1': isLeapYear ? 30 : 29, '2': 32, '3': 31, '4': 32, '5': 31, '6': 32, '7': 32, '8': 31, '9': 32, '10': 31, '11': 32, }
}
export const lengthOfOneWeek = 1000*60*60*24*7;
export const lengthOfOneDay = 1000*60*60*24;
export const lengthOfOneHour = 1000*60*60;

export const calendarClassNames = [ 'eightsun', 'eightmon', 'eighttue', 'eightwed', 'eightthu', 'eightfri', 'eightsat', 'ninesun', 'ninemon', 'ninetue', 'ninewed', 'ninethu', 'ninefri', 'ninesat', 'tensun', 'tenmon', 'tentue', 'tenwed', 'tenthu', 'tenfri', 'tensat', 'elevensun', 'elevenmon', 'eleventue', 'elevenwed', 'eleventhu', 'elevenfri', 'elevensat', 'twelvesun', 'twelvemon', 'twelvetue', 'twelvewed', 'twelvethu', 'twelvefri', 'twelvesat', 'thirteensun', 'thirteenmon', 'thirteentue', 'thirteenwed', 'thirteenthu', 'thirteenfri', 'thirteensat', 'fourteensun', 'fourteenmon', 'fourteentue', 'fourteenwed', 'fourteenthu', 'fourteenfri', 'fourteensat', 'fifteensun', 'fifteenmon', 'fifteentue', 'fifteenwed', 'fifteenthu', 'fifteenfri', 'fifteensat', 'sixteensun', 'sixteenmon', 'sixteentue', 'sixteenwed', 'sixteenthu', 'sixteenfri', 'sixteensat' ]

export const dateToCalendarClassName = (date: Date) => {
    return hours[date?.getHours()]+days[date?.getDay()]
}

export const isToday = (day: Date) => {
    const today = new Date();
    return day?.toDateString() == today?.toDateString()
}

const getClassNameDay = (calendarClassName: string) => calendarClassName?.slice(calendarClassName?.length-3);
const getClassNameHour = (calendarClassName: string) => calendarClassName?.slice(0, calendarClassName?.length-3);

export const filteredAppointmentsByCalendarClassname = (appointments: AppointmentsModel[], calendarClassName: string) => {
    const classNameDay = getClassNameDay(calendarClassName);
    const classNameHour = getClassNameHour(calendarClassName);
    return appointments?.length && appointments.filter((appointment) => {
        const startDate = new Date(appointment.start_date);
        const endDate = new Date(appointment.end_date);

        const [startDay, startHour] = [days[startDate?.getDay()], hours[startDate?.getHours()]];
        const [endDay, endHour, endMinutes] =  [days[endDate?.getDay()], hours[endDate?.getHours()], endDate?.getMinutes()];

        return (
            (
                startDay === classNameDay &&
                startHour === classNameHour
            ) || (
                endDay === classNameDay &&
                endHour === classNameHour &&
                endMinutes > 0
            )
        )
    });
}

export const calculateDateFromCalendarClassnameAndFirstDayOfWeek = (calendarClassName: string, firstDayOfWeek: Date) => {
    const classNameDay = getClassNameDay(calendarClassName);
    const classNameHour = getClassNameHour(calendarClassName);
    const [ day ] = Object.keys(days).filter((key) => days[key]===classNameDay).map(parseInt);
    const [ hour ] = Object.keys(hours).filter((key) => hours[key]===classNameHour).map(parseInt);
    const date = new Date(
        firstDayOfWeek?.getTime() + (day - 1)*lengthOfOneDay
    )
    date?.setHours(hour);
    return date;
}