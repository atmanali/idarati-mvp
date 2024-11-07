import '@styles/globals.css';
import '@styles/normalize.css';
import '@styles/variables.css';

import TopBar from '@components/TopBar/Topbar';
import { AppProps } from "next/app";
import React from 'react';
import { QueryClientProvider } from '@tanstack/react-query';
import queryClient from '@utils/queryClientUtils';

export default function App({Component, pageProps}: AppProps) {
    return(<>
        <QueryClientProvider client={queryClient}>
            <TopBar />
            <main id="main">
                <nav id="sidebar">ok ok</nav>
                <div  id="content">
                    <Component {...pageProps}/>
                </div>
            </main>
        </QueryClientProvider>
    </>)
}