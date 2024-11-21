import React, { useState } from "react";
import styles from "./Sidebar.module.css";
import { classNames } from "@utils/namings";
import CaretIcon from "@components/Icons/CaretIcon";
import UsersIcon from "@components/Icons/UsersIcon";
import { useRouter } from "next/router";


type Props = Omit<React.HTMLAttributes<HTMLUListElement>, 'className'>;

export default function ({...props}: Props) {
    const router = useRouter();
    const [isOpen, setIsOpen] = useState(false);
    const allClassNames = classNames([
        styles.container,
        isOpen && styles.open
    ])

    const handleUsersIconClick: React.MouseEventHandler<HTMLLIElement> = (event) => {
        event.stopPropagation();
        event.preventDefault();
        router.push('/users');
    }


    return (<ul className={allClassNames} {...props}>
        <li className={styles.openButton} onClick={()=>setIsOpen(!isOpen)}>
            <CaretIcon orientation={isOpen ? 'left' : 'right'} />
        </li>
        <li className="smallText" onClick={handleUsersIconClick}>
            <UsersIcon />
            <span className={ isOpen ? styles.visible : styles.invisible }>utilisateurs</span>
        </li>
    </ul>)
}