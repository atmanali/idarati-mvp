import React, { useState } from "react";
import styles from "./Input.module.css";
import { classNames } from "@utils/namings";
import Chip from "@components/Chip";

type Props = {
    soft?: boolean;
    size?: 'small' | 'medium' | 'large';
    color?: 'success' | 'error' | 'warning' | 'neutral' | 'info';
    options?: string[];
    icon?: React.ReactNode;
} & Omit<React.InputHTMLAttributes<HTMLInputElement>, 'color'|'size' >;

const Input = ({ soft=false, color='neutral', size='small', options, icon, ...props }: Props) => {
    const [value, setValue] = useState<string>('');
    const [localOptions, setLocalOptions] = useState<string[]>(options);
    const [isOpenOptionsPane, setIsOpenOptionsPane] = useState(false);


    const optionPaneClassNames = classNames([styles.optionsPanel, isOpenOptionsPane ? styles.optionsPanelOpen : styles.optionsPanelClose]);

    const onInputChange: React.ChangeEventHandler<HTMLInputElement> = ( event ) => {
        props?.onChange && props.onChange(event);
        const { value } = event.target;
        setValue(value);
        options && setLocalOptions(options?.filter((option) => option.includes(value)));
    }

    const handleInputClick: React.MouseEventHandler<HTMLInputElement> = ( event ) => {
        event.preventDefault();
        event.stopPropagation();
        setIsOpenOptionsPane(!isOpenOptionsPane);
    }

    const handleSelectOption: React.MouseEventHandler<Element> = ( event ) => {
        event.preventDefault();
        setValue(event.currentTarget.textContent);
        setLocalOptions(options);
    }
    const handleOptionPaneClick: React.MouseEventHandler<HTMLDivElement> = ( event ) => {
        event.stopPropagation();
        setIsOpenOptionsPane(false);
    }

    const pattern = options?.length && `(${options?.join('|')})`

    if (props?.required) props.placeholder = '* ' + props.placeholder;
    return (
    <div className={classNames([styles.container, props?.className])}>
        <input
            {...props}
            onClick={handleInputClick}
            className={classNames([styles.input, styles[color], styles[size], soft&&styles.soft])}
            onChange={ onInputChange }
            value={props?.disabled ? props?.value : value}
            pattern={pattern}
        />
        {icon && (<div className={classNames([styles.icon])}>
                {icon}
        </div>)}
        <div className={optionPaneClassNames} onClick={handleOptionPaneClick} >
            {localOptions?.map((option, index) =>
                <Chip key={index} onClick={handleSelectOption} label={option} selected={false} />
            )}
        </div>
    </div>)
}


export default Input;