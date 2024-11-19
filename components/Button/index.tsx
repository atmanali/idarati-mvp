import React from "react";
import styles from "./Button.module.css";



export type ButtonProps = {
    children?: React.ReactNode;
    variant?: 'plain' | 'outlined' | 'text';
    size?: 'small' | 'medium' | 'large';
    color?: 'success' | 'error' | 'warning' | 'neutral' | 'info'
} & Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'children'|'variant'|'size'|'color'>;

export default function Button({variant='text', color='neutral', size='small', children, ...props}: ButtonProps) {
    const classNames = [
        styles.container,
        styles[color],
        styles[variant],
        styles[size]
    ]
        .filter((className) => !!className)
        .join(' ')
    return (
        <button
            {...props}
            className={classNames}
        >
            {children}
        </button>
    )
}