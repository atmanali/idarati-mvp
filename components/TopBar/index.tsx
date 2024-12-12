import React from "react";
import Image from "next/image";
import { userName } from "@utils/namings";
import Tab from "@components/Tab";
import Link from "next/link";
import { useMutation } from "@tanstack/react-query";
import useAuth, { authKey } from "@services/auth";
import queryClient from "@utils/queryClientUtils";
import { deleteAuthInformation } from "@utils/authUtils";
import Dropdown, { OptionsType } from "@components/Dropdown/Dropdown";
import { useRouter } from "next/router";


type Props = {
    tabs: {label: string; href: string}[];
}

export default function TopBar({ tabs }: Props) {
    const { data, refetch } = useAuth();
    const router = useRouter();

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

    const dropdownItems: OptionsType[] = [
        {
            label: "Mon profil",
            action: (event) => {
                event.preventDefault();
                router.push('/users/me')
            },
            iconUrl: "/account_circle.svg",
        },
        {
            label: "Déconnexion",
            action: logout,
            iconUrl: "/logout.svg",
            color: "error",
        }
    ]

    return(<>
        <header id="topbar">
            <Link href={'/'}>
                <Image src="/iDarati.svg" alt="logo idarati" width={40} height={40} />
            </Link>
            <Tab tabs={tabs}/>
            <div>
                <Dropdown items={dropdownItems}>
                    <span>{userName(data?.user)}</span>
                    <Image src={data?.user?.avatar || "/account_circle.svg"} alt="photo de profil" width={40} height={40} />
                </Dropdown>
            </div>
        </header>
    </>)
}