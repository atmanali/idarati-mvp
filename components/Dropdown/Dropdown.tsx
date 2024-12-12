import React, { useState } from "react";
import styles from "./Dropdown.module.css";
import { classNames } from "@utils/namings";
import Label from "@components/Label/Label";
import Image from "next/image";

export type OptionsType = {
    label: string;
    action: React.MouseEventHandler<HTMLElement>;
    iconUrl?: string;
    color?: 'success' | 'error' | 'warning' | 'neutral' | 'info' | '';
}
type Props = {
    children: React.ReactNode;
    items: OptionsType[];
}

export default function ( { children, items }: Props ) {
    const [isItemsPanelOpen, setIsItemsPanelOpen] = useState(false);
    return (<>
        <div className={styles.dropdown}>
            <div className={classNames([styles.children, isItemsPanelOpen && 'childrenOpen'])}
                onClick={(event) => {event.preventDefault(); setIsItemsPanelOpen(!isItemsPanelOpen)}}
            >{children}</div>
            {items?.length ? (
                <div className={classNames([styles.items, styles[isItemsPanelOpen ? 'itemsOpen' : 'itemsClose']])}
                    onClick={() => setIsItemsPanelOpen(false)}
                >
                    {
                        items.map((option, index) => (
                            <div key={index+1} className={styles.item} onClick={option.action}>
                                {option?.iconUrl &&
                                    <Image src={option.iconUrl} alt="icon" color="error" width={24} height={24} />
                                }
                                <Label color={option?.color}>{option.label}</Label>
                            </div>
                        ))
                    }
                </div>
            ) : (
                <></>
            )
            }
        </div>
    </>)
}