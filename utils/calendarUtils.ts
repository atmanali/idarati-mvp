const hours = { '8': 'eight', '9': 'nine', '10': 'ten', '11': 'eleven', '12': 'twelve', '13': 'thirteen', '14': 'fourteen', '15': 'fifteen', '16': 'sixteen' };
const days = { '1': 'mon', '2': 'tue', '3': 'wed', '4': 'thu', '5': 'fri', '6': 'sat', '0': 'sun' };
export const months = { '0': 'janvier', '1': 'février', '2': 'mars', '3': 'avril', '4': 'mai', '5': 'juin', '6': 'juillet', '7': 'août', '8': 'septembre', '9': 'octobre', '10': 'novembre', '11': 'décembre', }
export const monthsLengths = (year: number) => {
    const isLeapYear = !(year%4) && !!(year%100) || !(year%400);

    return { '0': 32, '1': isLeapYear ? 30 : 29, '2': 32, '3': 31, '4': 32, '5': 31, '6': 32, '7': 32, '8': 31, '9': 32, '10': 31, '11': 32, }
}

export const arrayOfCalendarClassNames = [ 'eightsun', 'eightmon', 'eighttue', 'eightwed', 'eightthu', 'eightfri', 'eightsat', 'ninesun', 'ninemon', 'ninetue', 'ninewed', 'ninethu', 'ninefri', 'ninesat', 'tensun', 'tenmon', 'tentue', 'tenwed', 'tenthu', 'tenfri', 'tensat', 'elevensun', 'elevenmon', 'eleventue', 'elevenwed', 'eleventhu', 'elevenfri', 'elevensat', 'twelvesun', 'twelvemon', 'twelvetue', 'twelvewed', 'twelvethu', 'twelvefri', 'twelvesat', 'thirteensun', 'thirteenmon', 'thirteentue', 'thirteenwed', 'thirteenthu', 'thirteenfri', 'thirteensat', 'fourteensun', 'fourteenmon', 'fourteentue', 'fourteenwed', 'fourteenthu', 'fourteenfri', 'fourteensat', 'fifteensun', 'fifteenmon', 'fifteentue', 'fifteenwed', 'fifteenthu', 'fifteenfri', 'fifteensat', 'sixteensun', 'sixteenmon', 'sixteentue', 'sixteenwed', 'sixteenthu', 'sixteenfri', 'sixteensat' ]

export const dateToCalendarClassName = (date: Date) => {
    return hours[date?.getHours()]+days[date?.getDay()]
}