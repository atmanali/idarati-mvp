import styles from "./IconButton.module.css";
import { classNames } from "@utils/namings";
import Image from "next/image";
import React from "react"

type Props = {
    iconUrl: string;
    size?: 'extraSmall' | 'small' | 'medium' | 'large';
    color?: 'success' | 'error' | 'warning' | 'neutral' | 'info' | '';
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

const sizes = {extraSmall: 12,small: 24, medium: 28, large: 32};
export default function ( {iconUrl, size="small", color="neutral", ...props} : Props ) {
    return (<>
        <button {...props} className={classNames([props?.className, styles.container, !props?.disabled && styles[color]])} type="button">
            <Image className={classNames([styles.icon])} src={iconUrl} alt="icon button" width={sizes[size]} height={sizes[size]}/>
        </button>
    </>)
}