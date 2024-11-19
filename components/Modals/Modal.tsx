import React from "react";
import styles from "./Modal.module.css";
import Button, { ButtonProps } from "@components/Button";


export type ModalProps = {
    open: boolean;
    title?: string;
    showFooter?: boolean;
    onCancel?: React.MouseEventHandler<HTMLDivElement|HTMLButtonElement>;
    cancelButtonProps?: ButtonProps & {label?: string};
    confirmButtonProps?: ButtonProps & {label?: string};
}

export default function ({open, title, children, onCancel, cancelButtonProps, confirmButtonProps, showFooter=false}: ModalProps & {children: React.ReactNode}) {
    const handleMouseCancel: React.MouseEventHandler<HTMLDivElement|HTMLButtonElement> = (event) => {
        event.stopPropagation();
        event.preventDefault();
        onCancel && onCancel(event);
    }

    const neutralClick: React.MouseEventHandler<HTMLDivElement> = (event) => {
        event.stopPropagation();
        event.preventDefault();
    }

    const overlay = [styles.overlay, open ? styles.open : styles.close]
        .filter((className) => !!className)
        .join(' ')
    return (
        <div
            className={overlay}
            onClick={handleMouseCancel}
        >
            <div className={styles.container} onClick={neutralClick}>
                {
                    title &&
                    <header>
                        <h2>{title}</h2>
                    </header>
                }
                <div className={styles.body}>
                    {children}
                </div>
                {
                    showFooter &&
                    <footer>
                        <Button onClick={handleMouseCancel} {...cancelButtonProps} >{cancelButtonProps?.label || 'Annuler'}</Button>
                        <Button {...confirmButtonProps} >{confirmButtonProps?.label || 'Confirmer'}</Button>
                    </footer>
                }
            </div>
        </div>
    )
}