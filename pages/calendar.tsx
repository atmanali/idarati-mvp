import styles from "@styles/pages/calendar.module.css";
import { useAppointments } from "@services/appointments";
import { arrayOfCalendarClassNames, days, daysInFrench, isToday, months, monthsLengths } from "@utils/calendarUtils";
import CalendarItem from "@components/CalendarItem/CalendarItem";
import { useEffect, useState } from "react";
import IconButton from "@components/IconButton/IconButton";
import Label from "@components/Label/Label";
import { classNames } from "@utils/namings";


type TimeSlot = {
    start: Date;
    end: Date;
}
type Props = {
    timeSlots: TimeSlot[];
}

const lengthOfOneWeek = 1000*60*60*24*7;
const lengthOfOneDay = 1000*60*60*24;

export default function () {
    const { appointments, isFetched } = useAppointments();
    const [today, setToday] = useState<Date>(new Date());
    const [firstDayOfWeek, setFirstDayOfWeek] = useState<Date>();
    const [daysOfWeek, setDaysOfWeek] = useState<Date[]>();
    
    useEffect(() => {
        isFetched && console.log({appointments, firstDayOfWeek});
    }, [isFetched])

    useEffect(() => {
        setFirstDayOfWeek(new Date(
            today.getTime() - (today.getDay()-1)*lengthOfOneDay
        ));
    }, [today])
    useEffect(() => {
        setDaysOfWeek(
            Array(7).fill(0).map((elem, index) =>
                new Date(
                    firstDayOfWeek?.getTime() + index*lengthOfOneDay
                )
        ))
    }, [firstDayOfWeek])

    const calculateDayOfMonth = (daysOffset: number = 0) =>{
        const dayNumber = 
            (firstDayOfWeek?.getDate()+daysOffset)%monthsLengths(firstDayOfWeek?.getFullYear())[firstDayOfWeek?.getMonth()];
        return (!!daysOffset && dayNumber<6) ? dayNumber+1 : dayNumber;
    }
    
    
    const firstDayOfWeekWithMonth = () => `${calculateDayOfMonth()} ${months[firstDayOfWeek?.getMonth()]}`;

    return (<>
        <div className={classNames([styles.calendarContainer, "vstack"])}>
            <header>
                <div className="calendar-navigation-buttons">
                    <IconButton size="extraSmall" iconUrl="/chevron_left.svg" onClick={() => setToday(new Date(today.getTime() - lengthOfOneWeek))} />
                    <IconButton size="extraSmall" iconUrl="/chevron_right.svg" onClick={() => setToday(new Date(today.getTime() + lengthOfOneWeek))} />
                </div>
                <div className="calendar-title">
                    <span>Semaine du {firstDayOfWeekWithMonth()}</span>
                    <span>{firstDayOfWeek?.getFullYear()}</span>
                </div>
                <Label className={styles.resetToday} onClick={() => setToday(new Date())}>Aujourd'hui</Label>
            </header>
            <div className={classNames([styles.calendarGrid])}>
                {daysOfWeek?.map(
                    (dayOfWeek, index) =>
                        (<CalendarItem key={index} className={classNames([
                            styles[days[dayOfWeek?.getDay()]],
                            isToday(dayOfWeek) && styles.isToday,
                        ])}>
                            {daysInFrench[dayOfWeek?.getDay()]} {' '}
                            {calculateDayOfMonth((dayOfWeek?.getDay()-1)%7)}
                        </CalendarItem>)
                )}
                <CalendarItem className={styles.eight}>8h-9h</CalendarItem>
                <CalendarItem className={styles.nine}>9h-10h</CalendarItem>
                <CalendarItem className={styles.ten}>10h-11h</CalendarItem>
                <CalendarItem className={styles.eleven}>11h-12h</CalendarItem>
                <CalendarItem className={styles.twelve}>12h-13h</CalendarItem>
                <CalendarItem className={styles.thirteen}>13h-14h</CalendarItem>
                <CalendarItem className={styles.fourteen}>14h-15h</CalendarItem>
                <CalendarItem className={styles.fifteen}>15h-16h</CalendarItem>
                <CalendarItem className={styles.sixteen}>16h-17h</CalendarItem>
                {arrayOfCalendarClassNames.map(
                    calendarClassName => <CalendarItem className={styles[calendarClassName]} appointments={appointments} />
                )}
            </div>
            <footer className="hstack">calendar footer</footer>
        </div>
    </>)
}