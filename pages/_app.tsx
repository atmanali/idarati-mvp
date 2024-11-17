import '@styles/globals.css';
import '@styles/normalize.css';
import '@styles/variables.css';

import TopBar from '@components/TopBar';
import { AppProps } from "next/app";
import React, { useState } from 'react';
import { QueryClientProvider } from '@tanstack/react-query';
import queryClient from '@utils/queryClientUtils';
import AuthenticationProvider from '@components/AuthenticationProvider';
import { UsersModel } from '@models/index';

export default function App({Component, pageProps}: AppProps) {
    const [user, setUser] = useState<UsersModel>();

    return(<>
        <QueryClientProvider client={queryClient}>
            <AuthenticationProvider setUser={setUser}>
                <TopBar />
                <main id="main">
                    <nav id="sidebar">ok ok</nav>
                    <div  id="content">
                        <Component {...pageProps}/>
                    </div>
                </main>
            </AuthenticationProvider>
        </QueryClientProvider>
    </>)
}