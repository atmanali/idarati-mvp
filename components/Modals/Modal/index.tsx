import React from "react";
import styles from "./Modal.module.css";
import { classNames } from "@utils/namings";


export type ModalProps = {
    open: boolean;
    setOpen?: React.Dispatch<React.SetStateAction<boolean>>;
    title?: string;
    onCancel?: React.EventHandler<any>;
    children?: React.ReactNode;
}

export default function ({ open, setOpen, title, children, onCancel }: ModalProps) {
    const handleMouseCancel: React.MouseEventHandler<HTMLDivElement|HTMLButtonElement> = (event) => {
        event.stopPropagation();
        event.preventDefault();
        onCancel && onCancel(event);
        setOpen && setOpen(false);
    }

    const onContainerClick: React.MouseEventHandler<HTMLDivElement> = (event) => {
        event.stopPropagation();
    }

    return (
        <div
            className={classNames([styles.overlay, open ? styles.open : styles.close])}
            onClick={handleMouseCancel}
        >
            <div className={styles.container} onClick={onContainerClick}>
                { title && <header><h2> {title} </h2></header> }
                {children}
            </div>
        </div>
    )
}