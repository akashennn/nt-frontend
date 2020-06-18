import Link from "next/link";

import "./header.scss";
import React from "react";

const Header = props => (
    <Link href="/">
        <div className="header">{props.appTitle}</div>
    </Link>
);

export default Header;