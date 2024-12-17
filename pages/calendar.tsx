import styles from "@styles/pages/calendar.module.css";
import { useAppointments } from "@services/appointments";
import { arrayOfCalendarClassNames, classNames, dateToCalendarClassName, months } from "@utils/namings";
import CalendarItem from "@components/CalendarItem/CalendarItem";
import { useEffect, useState } from "react";
import { AppointmentsModel } from "@models/index";
import IconButton from "@components/IconButton/IconButton";
import Label from "@components/Label/Label";


type TimeSlot = {
    start: Date;
    end: Date;
}
type Props = {
    timeSlots: TimeSlot[];
}

const lengthOfOneWeek = 1000*60*60*24*7;

export default function () {
    const { appointments, isFetched } = useAppointments();
    const [today, setToday] = useState<Date>(new Date());
    
    useEffect(() => {
        isFetched && console.log(appointments);
        isFetched && convertDateOfAppointments(appointments);
    }, [isFetched])

    const convertDateOfAppointments = (aptmnts: AppointmentsModel[]) => {
        if (!aptmnts?.length) return;
        const startDates = aptmnts.map(aptmnt => new Date(aptmnt.start_date));
        const endDates = aptmnts.map(aptmnt => new Date(aptmnt.end_date));
        const startDatesClasseNames = startDates.map(dateToCalendarClassName)
        const endDatesClasseNames = endDates.map(dateToCalendarClassName)

        console.log({startDatesClasseNames, endDatesClasseNames});
    }

    const firstDayOfWeek = () => today?.getDate() - today?.getDay() + 1;
    const firstDayOfWeekWithMonth = () => `${firstDayOfWeek()} ${months[today?.getMonth()]}`;
    const lenghtOfActualMonth = () => months

    return (<>
        <div className={classNames([styles.calendarContainer, "vstack"])}>
            <header>
                <div>
                    <IconButton iconUrl="/chevron_left.svg" onClick={() => setToday(new Date(today.getTime() - lengthOfOneWeek))} />
                    <IconButton iconUrl="/chevron_right.svg" onClick={() => setToday(new Date(today.getTime() + lengthOfOneWeek))} />
                </div>
                Semaine du {firstDayOfWeekWithMonth()}
                <Label className={styles.resetToday} onClick={() => setToday(new Date())}>Aujourd'hui</Label>
            </header>
            <div className={classNames([styles.calendarGrid])}>
                <CalendarItem className={styles.mon}>Lundi {firstDayOfWeek()}</CalendarItem>
                <CalendarItem className={styles.tue}>Mardi {firstDayOfWeek() + 1}</CalendarItem>
                <CalendarItem className={styles.wed}>Mercredi {firstDayOfWeek() + 2}</CalendarItem>
                <CalendarItem className={styles.thu}>Jeudi {firstDayOfWeek() + 3}</CalendarItem>
                <CalendarItem className={styles.fri}>Vendredi {firstDayOfWeek() + 4}</CalendarItem>
                <CalendarItem className={styles.sat}>Samedi {firstDayOfWeek() + 5}</CalendarItem>
                <CalendarItem className={styles.sun}>Dimanche {firstDayOfWeek() + 6}</CalendarItem>
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