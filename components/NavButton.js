import Link from "next/link";
import { withRouter } from "next/router";

import "./nav-btn.scss";
import React from "react";

const NavButton = props => (
    <Link href={props.path}>
        <div
            className={`nav-btn ${
                props.router.pathname === props.path ? "active" : ""
            }`}
        >
            <div className="icon">{props.icon}</div>
            <span className="label">{props.label}</span>
        </div>
    </Link>
);

export default withRouter(NavButton);