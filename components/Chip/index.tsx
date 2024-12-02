import React from "react";
import styles from "./Chip.module.css";
import { classNames } from "@utils/namings";

type Props = {
    label: string;
    selected?: boolean;
} & Omit<React.HTMLAttributes<Element>, 'className'>;

export default function Chip({ label, selected=false, ...elementProps }: Props) {
    return (<>
        <div className={styles.container} {...elementProps} >
            {label}
            <div className={classNames([styles.selectedDefault, selected && styles.selected])} />
        </div>
    </>)
}