import styles from "./IconButton.module.css";
import { classNames } from "@utils/namings";
import Image from "next/image";
import React from "react"

type Props = {
    iconUrl: string;
    size?: 'small' | 'medium' | 'large';
    color?: 'success' | 'error' | 'warning' | 'neutral' | 'info' | '';
} & React.HTMLAttributes<HTMLButtonElement>;

const sizes = {small:24, medium: 28, large: 32};
export default function ( {iconUrl, size="small", color="neutral", ...buttonProps} : Props ) {
    return (<>
        <button className={classNames([styles.container, styles[color]])} {...buttonProps}>
            <Image className={classNames([styles.icon])} src={iconUrl} alt="icon button" width={sizes[size]} height={sizes[size]}/>
        </button>
    </>)
}