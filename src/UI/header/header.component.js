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
// import logo from '../../../assets/imgs/zina-india-logo.png';

const Header = ({
  onLogout,
  user,
  logo,
  toggleDrawer,
  notifications = [],
  noty = true,
  ...props
}) => {
  const fullName = user ? `${user.first_name} ${user.last_name}` : '';
  props.className = ['navbar navbar-dark header', props.className].join(' ');
  return (
    <nav {...props}>
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
        {noty && (
          <UncontrolledDropdown setActiveFromChild>
            <DropdownToggle tag="span">
              {/* <Button className="btn-circle"> */}
              <Icon icon="bell" />
              {/* </Button> */}
            </DropdownToggle>
            <NotificationPanel>
              {notifications.map((notification, i) => (
                <Notification
                  key={`notification_${i}`}
                  img={notification.img}
                  title={notification.title}
                  message={notification.message}
                />
              ))}
            </NotificationPanel>
          </UncontrolledDropdown>
        )}
        <UncontrolledDropdown setActiveFromChild className="custom-carets">
          <DropdownToggle tag="a" caret>
            <span className="user-name">{fullName}</span>
            {/* <Button className="btn-circle"><Icon icon="cog" /></Button> */}
          </DropdownToggle>
          <DropdownMenu right>
            <DropdownItem onClick={onLogout}>Logout</DropdownItem>
          </DropdownMenu>
        </UncontrolledDropdown>
      </div>
    </nav>
  );
};
export default Header;
