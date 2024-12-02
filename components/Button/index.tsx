import React from "react";
import styles from "./Button.module.css";
import { classNames } from "@utils/namings";



export type ButtonProps = {
    children?: React.ReactNode;
    variant?: 'plain' | 'outlined' | 'text';
    size?: 'extraSmall' | 'small' | 'medium' | 'large';
    color?: 'success' | 'error' | 'warning' | 'neutral' | 'info';
} & Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'children'|'variant'|'size'|'color'>;

export default function Button({variant='text', color='neutral', size='small', children, ...props}: ButtonProps) {

    return (
        <button
            {...props}
            className={classNames([
                styles.container,
                styles[color],
                styles[variant],
                styles[size]
            ])}
        >
            {children}
        </button>
    )
}