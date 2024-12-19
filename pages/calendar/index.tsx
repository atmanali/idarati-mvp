import styles from "@styles/pages/calendar.module.css";
import { useAppointments } from "@services/appointments";
import { calculateDateFromCalendarClassnameAndFirstDayOfWeek, calendarClassNames, days, daysInFrench, filteredAppointmentsByCalendarClassname, isToday, lengthOfOneDay, lengthOfOneWeek, months, monthsLengths } from "@utils/calendarUtils";
import CalendarItem from "@components/CalendarItem/CalendarItem";
import { useEffect, useState } from "react";
import IconButton from "@components/IconButton/IconButton";
import Label from "@components/Label/Label";
import { classNames } from "@utils/namings";
import { getCurrentUser } from "@utils/authUtils";
import AddAppointmentsFormModal from "@components/Forms/AddAppointmentsFormModal/AddAppointmentsFormModal";
import { useUsers } from "@services/users";
import { AppointmentsModel } from "@models/index";


export default function () {
    const [today, setToday] = useState<Date>(new Date());
    const [firstDayOfWeek, setFirstDayOfWeek] = useState<Date>();
    const [daysOfWeek, setDaysOfWeek] = useState<Date[]>();
    const [isOpenAddAppointmentsFormModal, setIsOpenAddAppointmentsFormModal] = useState(false);
    const [appointmentStartDate, setAppointmentStartDate] = useState<Date>();
    const [filteredAppointments, setFilteredAppointments] = useState<Partial<AppointmentsModel>[]>();
    const [filterByType, setFilterByType] = useState<'administratif' | 'cours' | 'entretien' | ''>('');

    const currentUser = getCurrentUser();
    const { appointments, refetch } = useAppointments({
        where: {
            start_date: {
                gte: firstDayOfWeek,
                lte: new Date(firstDayOfWeek?.getTime()+lengthOfOneWeek),
            },
            users: { some: { user_id: currentUser.id } }
        },
        include: { users: true }
    });
    const { users } = useUsers({
        where: {
            id: {not: currentUser?.id}
        }
    });

    useEffect(() => {
        const tmpDate = new Date(today?.getTime() - (today?.getDay()-1)*lengthOfOneDay);
        tmpDate?.setSeconds(0);
        tmpDate?.setMinutes(0);
        tmpDate?.setHours(0);

        setFirstDayOfWeek( tmpDate );
    }, [today])
    useEffect(() => {
        setDaysOfWeek(
            Array(7).fill(0).map((elem, index) =>
                new Date(
                    firstDayOfWeek?.getTime() + index*lengthOfOneDay
                )
        ));
        refetch();
    }, [firstDayOfWeek])

    useEffect(() => {
        filterByType
        ? setFilteredAppointments(appointments?.filter(appointment => appointment.type===filterByType))
        : setFilteredAppointments(appointments)
    }, [filterByType, appointments])

    const calculateDayOfMonth = (daysOffset: number = 0) => {
        const dayNumber = 
            (firstDayOfWeek?.getDate()+daysOffset)%monthsLengths(firstDayOfWeek?.getFullYear())[firstDayOfWeek?.getMonth()];
        return (!!daysOffset && dayNumber<6) ? dayNumber+1 : dayNumber;
    }
    
    
    const firstDayOfWeekWithMonth = () => `${calculateDayOfMonth()} ${months[firstDayOfWeek?.getMonth()]}`;

    function addAppointmentForThisDate(calendarClassName: string) {
        setAppointmentStartDate(
            calculateDateFromCalendarClassnameAndFirstDayOfWeek(
                calendarClassName,
                firstDayOfWeek
            )
        );
        setIsOpenAddAppointmentsFormModal(true);
    }

    return (<>
        <div className={classNames([styles.calendarContainer, "vstack"])}>
            <header>
                <div className="calendar-navigation-buttons">
                    <IconButton
                        size="extraSmall"
                        iconUrl="/chevron_left.svg"
                        onClick={() => setToday(new Date(today.getTime() - lengthOfOneWeek))}
                    />
                    <IconButton
                        size="extraSmall"
                        iconUrl="/chevron_right.svg"
                        onClick={() => setToday(new Date(today.getTime() + lengthOfOneWeek))}
                    />
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
                {calendarClassNames.map(
                    calendarClassName => (
                        <CalendarItem
                            className={styles[calendarClassName]}
                            anchor={calendarClassName}
                            appointments={filteredAppointmentsByCalendarClassname(filteredAppointments, calendarClassName)}
                            onClick={(event) => {
                                event.preventDefault();
                                event.stopPropagation();
                                addAppointmentForThisDate(calendarClassName);
                            }}
                        />
                    )
                )}
            </div>
            <footer>
                Filtrer par type:
                {['administratif','cours','entretien', ''].map(
                    (type: 'administratif' | 'cours' | 'entretien' | '') => 
                        <Label color={type && "info"} onClick={() => setFilterByType(type)}>{type || 'tous'}</Label>
                )}
            </footer>
        </div>
        <AddAppointmentsFormModal
            open={isOpenAddAppointmentsFormModal}
            onCancel={() => setIsOpenAddAppointmentsFormModal(false)}
            start_date={appointmentStartDate}
            filteredUsers={users}
        />
    </>)
}