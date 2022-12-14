import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import {
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
    Button
} from "reactstrap";
import Icon from "../icon/icon.component";
import Notification from "../notification/notification.component";
import NotificationPanel from "../notification/notification_panel.component";
// styles
import "./header.scss";
const Header = ({
    onLogout,
    user,
    logo,
    toggleDrawer,
    extraMenu,
    notification,
    notifiable,
    showUserMenu,
    userMenuItems,
    className
}) => {
    let fullName = "Zina User";
    if (user) {
        if (user.first_name && user.last_name) {
            fullName = `${user.first_name} ${user.last_name}`;
        } else if (user.username) {
            fullName = user.username;
        }
    }
    className = ["navbar", "navbar-dark", "header", className].join(" ");
    return (
        <nav className={className}>
            <div className="navbar-brand">
                <div className="menu-btn">
                    <Button onClick={toggleDrawer}>
                        <Icon icon="bars" />
                    </Button>
                </div>
                <Link to="/">
                    <img className="logo" src={logo} alt="zina" />
                </Link>
            </div>
            <div className="controls">
                {extraMenu}
                {notifiable && notification && (
                    <UncontrolledDropdown setActiveFromChild>
                        <DropdownToggle tag="span">
                            <Icon icon="bell" />
                        </DropdownToggle>
                        <NotificationPanel
                            page={notification.page}
                            size={
                                notification.size
                                    ? notification.size
                                    : notification.list
                                    ? notification.list.length
                                    : 0
                            }
                        >
                            {notification.list &&
                                notification.list
                                    .slice(0, 10)
                                    .map((notification_item, index) => {
                                        const ops = {
                                            key: `notification_${index}`,
                                            ...notification_item,
                                            generalClick: notification.onClick,
                                            index
                                        };
                                        if (notification.component) {
                                            const NotificationItem =
                                                notification.component;
                                            return (
                                                <NotificationItem {...ops} />
                                            );
                                        } else {
                                            return <Notification {...ops} />;
                                        }
                                    })}
                        </NotificationPanel>
                    </UncontrolledDropdown>
                )}
                {showUserMenu && (
                    <UncontrolledDropdown
                        setActiveFromChild
                        className="custom-carets"
                    >
                        <DropdownToggle tag="a" className="nav-link" caret>
                            <span className="user-name">{fullName}</span>
                        </DropdownToggle>
                        <DropdownMenu right>
                            {!userMenuItems && (
                                <DropdownItem onClick={onLogout}>
                                    Logout
                                </DropdownItem>
                            )}
                            {userMenuItems && userMenuItems(onLogout)}
                        </DropdownMenu>
                    </UncontrolledDropdown>
                )}
            </div>
        </nav>
    );
};

Header.propTypes = {
    notifiable: PropTypes.bool,
    showUserMenu: PropTypes.bool,
    className: PropTypes.string,
    logo: PropTypes.string,
    user: PropTypes.object,
    extraMenu: PropTypes.element,
    onLogout: PropTypes.func,
    toggleDrawer: PropTypes.func
};

Header.defaultProps = {
    notifiable: false,
    showUserMenu: false
};
export default Header;
