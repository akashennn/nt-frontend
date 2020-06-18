import Head from "next/head";

import Header from "./Header";
import NavBar from "./NavBar";

import "./layout.scss";
import "./index.scss";
import React from "react";

import navButtons from "../config/buttons";

const MobileLayout = (props) => {
    const appTitle = `>ShopNoon Mobile`;

    return (
        <div className="layout">
            <Head>
                <title>ShopNoon</title>
                <meta name="viewport" content="width=device-width, initial-scale=1"/>
                <meta charSet="utf-8"/>
            </Head>

            <Header appTitle={appTitle}/>
            <div className="content">{props.children}</div>
            <NavBar navButtons={navButtons}/>
        </div>
    );
};

export default MobileLayout;