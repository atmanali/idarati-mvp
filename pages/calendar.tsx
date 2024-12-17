import styles from "@styles/pages/calendar.module.css";
import { useAppointments } from "@services/appointments";
import { arrayOfCalendarClassNames, months, monthsLengths } from "@utils/calendarUtils";
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
    
    useEffect(() => {
        isFetched && console.log({appointments, firstDayOfWeek});
    }, [isFetched])

    useEffect(() => {
        setFirstDayOfWeek(new Date(
            today.getTime() - (today.getDay()-1)*lengthOfOneDay
        ));
    }, [today])

    const calculateDayOfWeek = (day: number = 0) =>{
        const output = (firstDayOfWeek?.getDate()+day)%monthsLengths(firstDayOfWeek?.getFullYear())[firstDayOfWeek?.getMonth()];
        return (!!day && output<6) ? output+1 : output;
    }
    
    const firstDayOfWeekWithMonth = () => `${calculateDayOfWeek()} ${months[today?.getMonth()]}`;

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
                <CalendarItem className={styles.mon}>Lundi {calculateDayOfWeek()}</CalendarItem>
                <CalendarItem className={styles.tue}>Mardi {calculateDayOfWeek(1)}</CalendarItem>
                <CalendarItem className={styles.wed}>Mercredi {calculateDayOfWeek(2)}</CalendarItem>
                <CalendarItem className={styles.thu}>Jeudi {calculateDayOfWeek(3)}</CalendarItem>
                <CalendarItem className={styles.fri}>Vendredi {calculateDayOfWeek(4)}</CalendarItem>
                <CalendarItem className={styles.sat}>Samedi {calculateDayOfWeek(5)}</CalendarItem>
                <CalendarItem className={styles.sun}>Dimanche {calculateDayOfWeek(6)}</CalendarItem>
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