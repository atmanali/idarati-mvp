import useAuth from "@services/auth";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react"

type Props = {
    children: React.ReactNode;
    setIsConnected: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function AuthenticationProvider ({ children, setIsConnected }: Props) {
    const [authenticated, setAuthenticated] = useState(false);
    const { data, isFetched } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (isFetched) {
            if (data?.session_expired)
                router.push(`/login?r=${router.pathname==='/login' ? "/" : router.asPath}`);
        }
        setAuthenticated(!data?.session_expired);
        setIsConnected(data && !data?.session_expired);
    }, [isFetched, data?.session_expired, router?.asPath])

    return (<>
        {(authenticated || router.pathname==='/login') && children}
    </>)
}