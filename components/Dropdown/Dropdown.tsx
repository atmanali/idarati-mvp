import React, { useState } from "react";
import styles from "./Dropdown.module.css";
import { classNames } from "@utils/namings";
import Label from "@components/Label/Label";
import Image from "next/image";

export type OptionsType = {
    label: string | { primary: string; secondary: string };
    action: React.MouseEventHandler<HTMLElement>;
    iconUrl?: string;
    color?: 'success' | 'error' | 'warning' | 'neutral' | 'info' | '';
}
type Props = {
    children: React.ReactNode;
    items: OptionsType[];
    hideArrow?: boolean;
}

export default function ( { children, hideArrow=false, items }: Props ) {
    const [isItemsPanelOpen, setIsItemsPanelOpen] = useState(false);
    return (<>
        <div className={styles.dropdown}>
            <div className={classNames([styles.children, !hideArrow && styles.arrow, isItemsPanelOpen && 'childrenOpen'])}
                onClick={(event) => {event.preventDefault(); setIsItemsPanelOpen(!isItemsPanelOpen)}}
            >{children}</div>
            {items?.length ? (
                <div className={classNames([styles.items, styles[isItemsPanelOpen ? 'itemsOpen' : 'itemsClose']])}
                    onClick={() => setIsItemsPanelOpen(false)}
                >
                    {
                        items.map((option, index) => (
                            <div key={index+1}
                                className={classNames([
                                    styles.item,
                                    typeof option.label != 'string' && styles.hasSecondaryLabel
                                ])}
                                onClick={option.action}
                            >
                                {option?.iconUrl &&
                                    <Image src={option.iconUrl} alt="icon" color="error" width={24} height={24} />
                                }
                                {typeof option.label === 'string' ? (
                                    <Label color={option?.color}>{option.label}</Label>
                                ) : (<>
                                    <Label color={option?.color}>{option.label.primary}</Label>
                                    <Label color="neutral" size="small">{option.label.secondary}</Label>
                                </>)}
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