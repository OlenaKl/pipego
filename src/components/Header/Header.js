import React from "react";
import logo from "../../resources/logo.png";
import "./styles.scss";

const Header = () => {
    return(
        <header className="header">
            <img src={ logo } alt="Pipedrive" title="Pipedrive" className="logo"/>
        </header>
    )
}

export default Header;