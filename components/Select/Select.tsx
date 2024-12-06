import Label from "@components/Label/Label";
import styles from "./Select.module.css";
import React, { useState } from "react"
import { classNames } from "@utils/namings";


type Props = {
    options: {label: string; value: any}[];
    setSelectedOption: React.Dispatch<React.SetStateAction<{label: string; value: any}>>;
    defaultLabel?: string;
} & React.HTMLAttributes<HTMLDivElement>;

export default function ( {options, defaultLabel='', setSelectedOption, ...props}: Props ) {
    const [selected, setSelected] = useState<{label: string; value: any}>();
    const [isOpenItemsPanel, setIsOpenItemsPanel] = useState(false);

    const handleOnLabelClick: React.MouseEventHandler<HTMLLabelElement> = ( event ) => {
        event.preventDefault();
        event.stopPropagation();
        setIsOpenItemsPanel(!isOpenItemsPanel);
    }
    const handleOnItemsClick: React.MouseEventHandler<HTMLDivElement> = ( event ) => {
        event.preventDefault();
        setIsOpenItemsPanel(false);
    }

    return (<>
        <div
            {...props}
            className={classNames([
                styles.dropdown,
                props?.className,
            ])}
        >
            <Label
                className={classNames([
                    styles.label,
                    styles[isOpenItemsPanel && 'labelOpen']
                ])}
                onClick={handleOnLabelClick}
                size="small"
            >
                {selected?.label || defaultLabel}
            </Label>
            {options?.length &&
                <div
                    className={classNames([
                        styles.items, 
                        styles[isOpenItemsPanel ? 'itemsOpen' : 'itemsClose']
                    ])}
                    onClick={handleOnItemsClick}
                >
                    <div
                        className={classNames([styles.item, styles.defaultItem])}
                        onClick={() => {
                            setSelected(null);
                            setSelectedOption(null);
                        }}
                    >{defaultLabel}</div>
                    {
                        options.map((option, index)=>(
                            <div
                                key={index+1}
                                className={styles.item}
                                onClick={() => {
                                    setSelected(option);
                                    setSelectedOption(option);
                                }}
                            >{option.label}</div>
                        ))
                    }
                </div>
            }
        </div>
    </>)
}