import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import Icon from '../icon/icon.component'
// import './menu.scss';

const computeMenuItem = ({ link, icon, name }, key, show) => (
    <li key={`zina-primary-mey-${key}`}>
        <NavLink exact={true} activeClassName="active" to={link}>
            <span className="icon">
                <Icon icon={icon} />
            </span>
            <span className={['item', ...(show ? ['show'] : [])].join(' ')}>
                {name}
            </span>
        </NavLink>
    </li>
);
const Menu = ({ show, config }) => {
    return (
        <ul className="menu-bar list-unstyled">
            {config && config.map((menu, index) => computeMenuItem(menu, index, show))}
        </ul>
    );
};

Menu.propTypes = {
    show: PropTypes.bool,
    config: PropTypes.arrayOf(
        PropTypes.shape({
            link: PropTypes.string.isRequired,
            icon: PropTypes.string.isRequired,
            name: PropTypes.string.isRequired
        })
    )
};

export default Menu;
