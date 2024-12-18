import styles from "./CalendarItem.module.css";
import { AppointmentsModel } from "@models/index";
import { classNames } from "@utils/namings";
import React from "react";
import AppointmentItem from "./AppointmentItem";

type Props = {
    appointments?: Partial<AppointmentsModel>[];
    anchor?: string;
} & React.HTMLAttributes<HTMLDivElement>;

export default function ({ appointments, anchor, children, ...props }: Props) {

    return (<div className={classNames([props?.className, styles.calendarItem])}>
        {children ||
            (appointments?.length
                ? (
                    <div className={classNames([styles.calendarAppointmentsContainer])}>
                        {appointments.map((appointment) => (<>
                            <AppointmentItem appointment={appointment} anchor={anchor} />
                        </>))}
                    </div>
                ) : ( null )
            )
        }
    </div>)
}