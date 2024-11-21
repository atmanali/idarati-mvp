import '@styles/globals.css';
import '@styles/normalize.css';
import '@styles/variables.css';

import TopBar from "@components/TopBar";
import { AppProps } from "next/app";
import React, { useState } from "react";
import { QueryClientProvider } from "@tanstack/react-query";
import queryClient from "@utils/queryClientUtils";
import AuthenticationProvider from "@components/AuthenticationProvider";
import Sidebar from '@components/Sidebar';


const tabs = [
    {label: 'Résultats', href: 'results'},
    {label: 'Calendrier', href: 'calendar'},
]

export default function App({Component, pageProps}: AppProps) {
    const [isConnected, setIsConnected] = useState(false);

    return(<>
        <QueryClientProvider client={queryClient}>
            <AuthenticationProvider setIsConnected={setIsConnected} >
                {isConnected && <TopBar tabs={tabs} />}
                <main id="main">
                    {isConnected &&
                        <aside id="sidebar">
                            <Sidebar />
                        </aside>
                    }
                    <div  id="content">
                        <Component {...pageProps}/>
                    </div>
                </main>
            </AuthenticationProvider>
        </QueryClientProvider>
    </>)
}