import styles from "./CalendarItem.module.css";
import { AppointmentsModel } from "@models/index";
import { classNames } from "@utils/namings";
import React from "react";

type Props = {
    appointments?: Partial<AppointmentsModel>[];
} & React.HTMLAttributes<HTMLDivElement>;

export default function ({ appointments, children, ...props }: Props) {
    return (<div className={classNames([props.className, styles.calendarItem])}>
        {children}
    </div>)
}