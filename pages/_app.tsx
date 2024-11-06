import '@styles/globals.css';
import '@styles/normalize.css';
import '@styles/variables.css';

import TopBar from '@components/TopBar';
import { AppProps } from "next/app";
import React from 'react';

export default function App({Component, pageProps}: AppProps) {
    return(<>
        <TopBar />
        <main id="main">
            <nav id="sidebar"></nav>
            <div  id="content">
                <Component {...pageProps}/>
            </div>
        </main>
    </>)
}