import { UsersModel } from "@models/index";
import useAuth, { authKey } from "@services/auth";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react"

type Props = {
    children: React.ReactNode;
    setUser: React.Dispatch<React.SetStateAction<UsersModel>>;
}
export type LoginProps = {
    username: string;
    password: string;
}

export default function AuthenticationProvider ({ children, setUser }: Props) {
    const [authenticated, setAuthenticated] = useState(false);
    const { data, isFetched } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (isFetched) {
            if (data?.session_expired)
                router.push(`/login?r=${router.asPath.includes("login") ? "/" : router.asPath}`);
        }
        setAuthenticated(!data?.session_expired);
        !data?.session_expired && setUser(data.user);
    }, [isFetched, data?.session_expired, router?.asPath])

    return (<>
        {(authenticated || router.pathname==='/login') && children}
    </>)
}