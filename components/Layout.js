import Head from "next/head";

import Header from "./Header";
import NavBar from "./NavBar";
import ReactNotification from 'react-notifications-component'
import "react-notifications-component/dist/scss/notification.scss"
import "./layout.scss";
import "./index.scss";
import React from "react";

import navButtons from "../config/buttons";

const Layout = (props) => {
    const appTitle = `>ShopNoon Desktop`;

    return (
        <div className="layout">
            <Head>
                <title>ShopNoon</title>
                <meta name="viewport" content="width=device-width, initial-scale=1"/>
                <meta charSet="utf-8"/>
            </Head>

            <div className="container-fluid">
                <ReactNotification />
                <Header appTitle={appTitle}/>

                <NavBar navButtons={navButtons}/>

                <div className="content">
                    {props.children}
                </div>
            </div>
        </div>
    );
};

export default Layout;