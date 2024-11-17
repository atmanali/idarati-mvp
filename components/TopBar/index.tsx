import React from "react";
import Image from "next/image";
import { UsersModel } from "@models/index";
import { userName } from "@utils/namings";
import Tab from "@components/Tab";
import Link from "next/link";


type Props = {
    user: Partial<UsersModel & {avatar: string}>;
    tabs: {label: string; href: string}[];
}

export default function TopBar({ user, tabs }: Props) {
    return(<>
        <header id="topbar">
        {user
            ? (<>
                <Link href={'/'}>
                    <Image src="/iDarati.svg" alt="logo idarati" width={40} height={40} />
                </Link>
                <Tab tabs={tabs}/>
                <div>
                    <span>{userName(user)}</span>
                    <Image src={user?.avatar || "/photo.svg"} alt="photo de profil" width={40} height={40} />
                </div>
            </>)
            : (<h3>Veuillez vous connecter</h3>)
            }
        </header>
    </>)
}