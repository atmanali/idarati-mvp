import React, { useState } from "react";
import styles from "./Input.module.css";

type Props = {
    size?: 'small' | 'medium' | 'large';
    color?: 'success' | 'error' | 'warning' | 'neutral' | 'info';
} & Omit<React.InputHTMLAttributes<HTMLInputElement>, 'className'|'class'|'color'|'size' >;

const Input = ({color='neutral', size='small', ...props}: Props) => {
    const [value, setValue] = useState<string>('');

    const onInputChange: React.ChangeEventHandler<HTMLInputElement> = ( event ) => {
        props?.onChange && props.onChange(event);
        const { value } = event.target;
        setValue(value);
    }

    if (props?.required) props.placeholder = '* ' + props.placeholder;
    return (
        <input
            {...props}
            className={`${styles.Input} ${styles[color]} ${styles[size]}`}
            onChange={ onInputChange }
            value={value || props?.value}
        />
    )
}


export default Input;