import React from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {
    faHome, faHeart
} from "@fortawesome/free-solid-svg-icons";

const navButtons = [
    {
        label: "Home",
        path: "/",
        icon: <FontAwesomeIcon icon={faHome}/>
    },
    {
        label: "Favourite",
        path: "/dashboard",
        icon: <FontAwesomeIcon icon={faHeart}/>
    }
];

export default navButtons;