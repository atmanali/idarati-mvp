import React, { ReactNode, useEffect } from "react";
import styles from "./Button.module.css";



type Props = React.HTMLAttributes<HTMLButtonElement> & {
    variant?: 'plain' | 'outlined' | 'text';
    size?: 'small' | 'medium' | 'large';
    color?: 'success' | 'error' | 'warning' | 'neutral' | 'info'
}

export default function Button({children, variant='text', color='neutral', size='small', ...props}: Props) {
    return (
        <button
            {...props} 
            className={`${styles.container} ${styles[color]} ${styles[variant]} ${styles[size]}`}
        >
            {children}
        </button>
    )
}