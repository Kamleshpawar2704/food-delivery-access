import React, { useState } from "react";
import "./Navigation.css";

let Navigation = (props) => {
    const navItem = props.nav
    const navIcons = props.icon

    const [showSearch, setShowSearch] = useState(false);

    const handleIconClick = (index) => {
        if (navIcons[index] === "bi bi-search") {
            setShowSearch(!showSearch);
        } else if (props.onIconClick) {
            props.onIconClick(index);
        }
    };

    return (
        <div className="main-nav" >

            <a href=""><img className="logo" src={props.logos} alt="" /></a>

            <ul className="nav-ul">
                {navItem.map((link, i) => (
                    <li key={i} className="nav-li"><a href="" className="nav-a">{link}</a></li>
                ))}
            </ul>

            <div className="nav-icons">
                {navIcons.map((icon, j) => (
                    icon === "bi bi-bag" ? (
                        <div key={j}>{props.cartComponent}</div>
                    ) : (
                        <a href="" key={j} onClick={(e) => { e.preventDefault(); handleIconClick(j); }}><i className={icon}></i></a>
                    )
                ))}

                {showSearch && (
                    <input
                        type="text"
                        className="search-input"
                        placeholder="Search foods..."
                        onChange={(e) => props.onSearchChange && props.onSearchChange(e.target.value)}
                        autoFocus
                    />
                )}

                <a href="" data-bs-toggle="offcanvas" data-bs-target="#offcanvasTop" aria-controls="offcanvasTop" ><i className={props.ListIcon}></i></a>

                <div class="offcanvas offcanvas-top bg-dark" tabindex="-1" id="offcanvasTop" aria-labelledby="offcanvasTopLabel">
                    <div class="offcanvas-header">
                        <h5 class="offcanvas-title" id="offcanvasTopLabel">
                            <a href=""><img className="logo" src={props.logos} alt="" /></a>
                        </h5>
                        <button type="button" class="btn-close " data-bs-dismiss="offcanvas" aria-label="Close"></button>
                    </div>
                    <div class="offcanvas-body">
                        <ul className="">
                            {navItem.map((link, i) => (
                                <li key={i} className="nav-li list-unstyled"><a href="" className="nav-a">{link}</a></li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </div >
    );
}
export default Navigation;
