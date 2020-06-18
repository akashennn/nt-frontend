import Link from "next/link";

import "./Header.scss";
import React from "react";

const Header = props => (
    <Link href="/">
        <div className="Header">{props.appTitle}</div>
    </Link>
);

export default Header;