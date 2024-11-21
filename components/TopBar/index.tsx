import React, { useEffect } from "react";
import Image from "next/image";
import { UsersModel } from "@models/index";
import { userName } from "@utils/namings";
import Tab from "@components/Tab";
import Link from "next/link";
import Button from "@components/Button";
import { useMutation } from "@tanstack/react-query";
import useAuth, { authKey } from "@services/auth";
import queryClient from "@utils/queryClientUtils";
import { deleteAuthInformation } from "@utils/authUtils";


type Props = {
    tabs: {label: string; href: string}[];
}

export default function TopBar({ tabs }: Props) {
    const { data, refetch } = useAuth();

    const { mutateAsync } = useMutation({
        mutationFn: async (): Promise<any> => deleteAuthInformation(),
        onSuccess: () => {
            // todo: alert('succeed');
            queryClient.setQueryData([authKey], {session_expired: true});
        },
        onError: () => {
          // todo: alert('failed');
        }
    })

    const logout: React.MouseEventHandler<HTMLButtonElement> = (event) => {
        event.preventDefault();
        event.stopPropagation();
        mutateAsync().then( () => refetch() );
    }
    return(<>
        <header id="topbar">
            <Link href={'/'}>
                <Image src="/iDarati.svg" alt="logo idarati" width={40} height={40} />
            </Link>
            <Tab tabs={tabs}/>
            <div>
                <span>{userName(data?.user)}</span>
                <Image src={data?.user?.avatar || "/default-avatar.svg"} alt="photo de profil" width={40} height={40} />
                { // disconnect
                    <Button variant="plain" color="warning" onClick={logout}/>
                }
            </div>
        </header>
    </>)
}