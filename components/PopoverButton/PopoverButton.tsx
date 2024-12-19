import styles from "./PopoverButton.module.css";
import { classNames } from "@utils/namings";
import React from "react";

type Props = {
    popoverTargetId: string;
    children: React.ReactNode;
} & Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'popoverTarget' | 'popoverTargetAction' >
export default function({ popoverTargetId, children, ...props }: Props) {
    return (<>
        {//popoverTargetId &&
            <button {...props}
                className={classNames([props.className, styles.popoverButton])}
                popoverTarget={popoverTargetId}
                popoverTargetAction="toggle"
            >
                {children}
            </button>
        }
    </>)
}