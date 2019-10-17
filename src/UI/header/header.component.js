import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import {
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
    Button
} from 'reactstrap';
import Icon from '../icon/icon.component'
import Notification from '../notification/notification.component';
import NotificationPanel from '../notification/notification_panel.component';
// styles
import './header.scss';

const Header = ({
    onLogout,
    user,
    logo,
    toggleDrawer,
    extraMenu,
    notifications,
    notifiable,
    showUserMenu,
    userMenuItems,
    className,
    page,
    generalClick,
    NotificationItem
}) => {
    let fullName = 'Zina User';
    if (user) {
        if (user.first_name && user.last_name) {
            fullName = `${user.first_name} ${user.last_name}`;
        } else if (user.username) {
            fullName = user.username;
        }
    }
    className = ['navbar', 'navbar-dark', 'header', className].join(' ');
    return (
        <nav className={className}>
            <div className="navbar-brand">
                <Link to="/">
                    <img className="logo" src={logo} alt="zina" />
                </Link>
                <div className="menu-btn">
                    <Button onClick={toggleDrawer}>
                        <Icon icon="bars" />
                    </Button>
                </div>
            </div>
            <div className="controls">
                {extraMenu}
                {notifiable && (
                    <UncontrolledDropdown setActiveFromChild>
                        <DropdownToggle tag="span">
                            <Icon icon="bell" />
                        </DropdownToggle>
                        <NotificationPanel page={page} size={notifications.length}>
                            {notifications.slice(0, 10).map((notification, index) =>(
                                    <NotificationItem
                                        key={`notification_${index}`}
                                        {...notification}
                                        generalClick={generalClick}
                                        index={index}
                                    />
                                )
                            )}
                        </NotificationPanel>
                    </UncontrolledDropdown>
                )}
                {showUserMenu && (
                    <UncontrolledDropdown setActiveFromChild className="custom-carets">
                        <DropdownToggle tag="a" caret>
                            <span className="user-name">{fullName}</span>
                        </DropdownToggle>
                        <DropdownMenu right>
                            {!userMenuItems && (<DropdownItem onClick={onLogout}>Logout</DropdownItem>)}
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
    notifications: PropTypes.array,
    extraMenu: PropTypes.oneOf([PropTypes.element, PropTypes.arrayOf(PropTypes.element)]),
    onLogout: PropTypes.func,
    toggleDrawer: PropTypes.func,
    userMenuItems: PropTypes.func,
    page: PropTypes.string,
    NotificationItem: PropTypes.element
};
Header.defaultProps = {
    notifiable: false,
    showUserMenu: false,
    notifications: [],
    NotificationItem: Notification
};
export default Header;
