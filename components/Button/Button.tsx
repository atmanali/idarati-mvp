import React, { ReactNode, useEffect } from "react";
import styles from "./Button.module.css";



type Props = React.HTMLAttributes<HTMLButtonElement> & {
    variant?: 'plain' | 'outlined' | 'text';
    size?: 'small' | 'medium' | 'large';
    color?: 'success' | 'error' | 'warning' | 'neutral'
}

export default function Button({children, variant='plain', color='neutral'}: Props) {
    useEffect(()=>{
        console.log(styles);
    }, [])
    return (<button className={`${styles.container} ${styles[color]} ${styles[variant]}`}>
        {children}
    </button>)
}