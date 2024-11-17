import React from "react";
import styles from "./Button.module.css";



type Props = {
    buttonProps?: Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'children'>;
    children?: React.ReactNode;
    variant?: 'plain' | 'outlined' | 'text';
    size?: 'small' | 'medium' | 'large';
    color?: 'success' | 'error' | 'warning' | 'neutral' | 'info'
}

export default function Button({variant='text', color='neutral', size='small', buttonProps, children}: Props) {
    return (
        <button
            {...buttonProps} 
            className={`${styles.container} ${styles[color]} ${styles[variant]} ${styles[size]}`}
        >
            {children}
        </button>
    )
}