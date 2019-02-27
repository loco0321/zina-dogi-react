import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Collapse } from 'reactstrap'
import { NavLink } from 'react-router-dom';
import Icon from '../icon/icon.component'
// import './menu.scss';

export default class Menu extends Component {

  static defaultProps = {
    show: false
  }

  static propTypes = {
    show: PropTypes.bool,
    toggleDrawer: PropTypes.func,
    config: PropTypes.arrayOf(
      PropTypes.shape({
        link: PropTypes.string,
        icon: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        children: PropTypes.arrayOf(
          PropTypes.shape({
            link: PropTypes.string.isRequired,
            icon: PropTypes.string,
            name: PropTypes.string.isRequired,
          })
        )
      })
    ).isRequired,
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
        if (Array.isArray(menu.children) && menu.children.length > 0) {
          return this._computeSubMenuItem(menu, index)
        }
      })
      return (
        <ul className="menu-bar list-unstyled">{config && resMenu}</ul>
      );
    }
    return (<ul className="menu-bar list-unstyled" />);
  }

  _computeMenuItem = ({ link, icon, name }, key) => {
    const { show } = this.props;
    return (
      <li key={`zina-primary-menu-${key}`}>
        {link && <NavLink exact={true} activeClassName="active" className="menu-item" to={link}>
          <span className="icon">
            {icon && <Icon icon={icon} />}
          </span>
          <span className={['item', ...(show ? ['show'] : [])].join(' ')}>
            {name}
          </span>
        </NavLink>}
      </li>
    )
  };

  _onClickSubMenu = e => {
    const { toggleDrawer, show } = this.props;
    if (!show){
      toggleDrawer();
      setTimeout(() => {
        console.log('o.o');
        this.setState({
          isOpen: true
        });
      }, 1000)
    }else{
      this._toggle();
    }
  }

  _toggle = () => {
    console.log('noc');

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
            className="submenu-item"
          >
            <span className="icon">
              <Icon icon={icon} />
            </span>
            {show && <span className={menuNameClassNames}>
              {name}
              <span style={{ flex: '1 1 auto' }} />
              <span className="btn-icon">
                <Icon icon="angle-down" />
              </span>
            </span>}
          </div>
          <Collapse isOpen={this.state.isOpen}>
            <ul className="submenu">
              {children.map((menu, index) => this._computeMenuItem(menu, index, show, false))}
            </ul>
          </Collapse>
        </div>
      </li>
    )
  };
}
