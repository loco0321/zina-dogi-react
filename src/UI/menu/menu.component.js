import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { UncontrolledCollapse as Collapse } from 'reactstrap'
import { NavLink } from 'react-router-dom';
import Icon from '../icon/icon.component'
// import './menu.scss';
const icon_type = PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.shape({
        type: PropTypes.oneOf(['solid', 'brands', 'svg']),
        icon: PropTypes.string.isRequired
    })
]);

export const config_propType = PropTypes.arrayOf(
    PropTypes.shape({
        link: PropTypes.string,
        icon: icon_type,
        name: PropTypes.string.isRequired,
        onClick: PropTypes.func,
        children: PropTypes.arrayOf(
            PropTypes.shape({
                link: PropTypes.string.isRequired,
                icon: icon_type,
                name: PropTypes.string.isRequired,
            })
        )
    })
).isRequired


export default class Menu extends Component {

    static defaultProps = {
        show: false
    }

    static propTypes = {
        show: PropTypes.bool,
        toggleDrawer: PropTypes.func,
        config: config_propType,
    }

    constructor(props) {
        super(props);
        this.state = {
            isOpen: false
        }
    }

    render() {
        const { config } = this.props;
        if (config) {
            const resMenu = config.map((menu, index) => {
                if (menu.link) {
                    return this._computeMenuItem(menu, index);
                }
                if (Array.isArray(menu.children) && menu.children.length) {
                    return this._computeSubMenuItem(menu, index)
                }
                return null;
            })
            return (
                <ul className="menu-bar list-unstyled">{config && resMenu}</ul>
            );
        }
        return (<ul className="menu-bar list-unstyled" />);
    }


    _getIcon = (icon) => {
        if (typeof icon === 'string') {
            return <Icon icon={icon} />
        } else if (typeof icon === 'object') {
            return <Icon {...icon} />
        }
    }

    _computeMenuItem = ({ link, icon, name, onClick }, key) => {
        const { show } = this.props;
        return (
            <li key={`zina-primary-menu-${key}`}>
                {link && link !== '#' && <NavLink exact={true} activeClassName="active" className="menu-item" to={link}>
                    <span className="icon">
                        {icon && this._getIcon(icon)}
                    </span>
                    <span className={['item', ...(show ? ['show'] : [])].join(' ')}>
                        {name}
                    </span>
                </NavLink>}
                {link && link === '#' && <div className="menu-item" onClick={onClick}>
                    <span className="icon">
                        {icon && this._getIcon(icon)}
                    </span>
                    <span className={['item', ...(show ? ['show'] : [])].join(' ')}>
                        {name}
                    </span>
                </div>}
            </li>
        )
    };

    _onClickSubMenu = e => {
        const { toggleDrawer, show } = this.props;
        if (!show) {
            toggleDrawer();
        }
    }

    _toggle = () => {
        this.setState({
            isOpen: !this.state.isOpen
        })
    }

    _computeSubMenuItem = ({ icon, name, children }, key) => {
        const { show } = this.props;

        const menuNameClassNames = [
            'item',
            'submenu-item-name',
            ...(show ? ['show'] : [])
        ].join(' ');

        return (
            <li key={`zina-primary-submenu-${key}`} >
                <div className="parent_menu" >
                    <div
                        onClick={this._onClickSubMenu}
                        id={`toggler-${key}`}
                        className="submenu-item"
                    >
                        <span className="icon">
                            {this._getIcon(icon)}
                        </span>
                        <span className={menuNameClassNames}>
                            {name}
                            <span style={{ flex: '1 1 auto' }} />
                            {show && <span className="btn-icon">
                                <Icon icon="angle-down" />
                            </span>}
                        </span>
                    </div>
                    {show && <Collapse toggler={`toggler-${key}`}>
                        <ul className="submenu">
                            {children.map((menu, index) => this._computeMenuItem(menu, index, show, false))}
                        </ul>
                    </Collapse>}
                </div>
            </li>
        )
    };
}
