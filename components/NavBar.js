import "./nav-bar.scss";
import NavButton from "./NavButton";
import React from "react";

const NavBar = props => (
    <div className="nav-bar">
        {props.navButtons.map(button => (
            <NavButton
                key={button.path}
                path={button.path}
                label={button.label}
                icon={button.icon}
            />
        ))}
    </div>
);

export default NavBar;