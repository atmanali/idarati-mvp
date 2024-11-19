import { UsersModel } from "@models/index";
import useAuth, { authKey } from "@services/auth";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react"

type Props = {
    children: React.ReactNode;
    setIsConnected: React.Dispatch<React.SetStateAction<boolean>>;
}
export type LoginProps = {
    username: string;
    password: string;
}

export default function AuthenticationProvider ({ children, setIsConnected }: Props) {
    const [authenticated, setAuthenticated] = useState(false);
    const { data, isFetched } = useAuth();
    const router = useRouter();

    useEffect(() => {
        console.log(data);
    }, [data])

    useEffect(() => {
        if (isFetched) {
            if (data?.session_expired)
                router.push(`/login?r=${router.asPath.includes("login") ? "/" : router.asPath}`);
        }
        setAuthenticated(!data?.session_expired);
        setIsConnected(data && !data?.session_expired);
    }, [isFetched, data?.session_expired, router?.asPath])

    return (<>
        {(authenticated || router.pathname==='/login') && children}
    </>)
}