import Button from "@components/Button";
import { UsersModel } from "@models/index";
import useAuth, { authKey } from "@services/auth";
import queryClient from "@utils/queryClientUtils";
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
    const { data, isFetched, refetch } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (isFetched) {
            if (data?.session_expired)
                router.push(`/login?r=${router.asPath.includes("login") ? "/" : router.asPath}`);
        }
        setAuthenticated(!data?.session_expired);
    }, [isFetched, data?.session_expired, router?.asPath])

    return (<>
        <div style={{display: 'flex'}}>
            <Button buttonProps={{
                onClick: () => {queryClient.clear()}
            }}>
                reset query cache
            </Button>
            <Button buttonProps={{}}>
                verifyToken
            </Button>
            <Button buttonProps={{
                onClick: () => console.log(queryClient.getQueryData([authKey]))
            }}>
                console.log token and user
            </Button>
            <Button buttonProps={{
                onClick: () => console.log(refetch)
            }}>
                refetch
            </Button>
        </div>
        {(authenticated || router.pathname==='/login') && children}
    </>)
}