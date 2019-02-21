import React, { Component } from 'react';
import ReactDOMServer from "react-dom/server";
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import ErrorBoundary from '../bonduary/ErrorBonduary';
import Drawer, {
  DrawerContainer,
  MainContentContainer
} from 'react-swipeable-drawer';
import Header from '../header/header.component'
import Menu from '../menu/menu.component';
import Icon from '../icon/icon.component'
import Button from '../button/button.component';
import { Card, CardBody, CardHeader, Collapse } from 'reactstrap';
import BarLoader from 'react-spinners/BarLoader';

// const nt = [
//     {
//         title: 'Notification 1',
//         message:
//             'Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque ante sollicitudin. Cras purus odio.'
//     },
//     {
//         message:
//             'Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque ante sollicitudin. Cras purus odio.'
//     },
//     {
//         img: 'https://uinames.com/api/photos/male/12.jpg',
//         title: 'Notification 1',
//         message:
//             'Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque ante sollicitudin. Cras purus odio.'
//     }
// ];

class ZinaCard extends Component {
  state = {
    header: null,
    collapse: false
  }

  render() {
    const { children, ...props } = this.props;
    const type = typeof children.type === "string";
    return (
      <Card {...props}>
        {this.state.header && <CardHeader>
          {this.state.header}
        </CardHeader>}
        <Collapse isOpen={!this.state.collapse}>
          <CardBody>
            {!type && React.cloneElement(children, {
              setheader: this._setHeader,
              togglecollapse: this._toggle,
              iscollapse: this.state.collapse
            })}
            {type && children}
          </CardBody>
        </Collapse>
      </Card>
    )
  }

  _toggle = () => {
    this.setState({ collapse: !this.state.collapse });
  }

  _getElementStr = ele => ReactDOMServer.renderToString(ele);

  _setHeader = header => {
    if (this._getElementStr(this.state.header) !== this._getElementStr(header)) {
      this.setState({ header })
    }
  }
}

class Base extends Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
    loading: PropTypes.bool.isRequired,
    nt: PropTypes.array,
  };

  constructor(props) {
    super(props);
    this.drawerSize = this._computeSize();
    this.extraProps = {}
  }

  componentDidMount() {
    const { title } = this.props;
    document.title = `ZINA${title ? ` | ${title}` : ''}`;
    window.addEventListener('resize', this._onChangeSize);
    this.props = { ...this.props, name: "hola" }
    this._velidateExtraProps();
  }

  _getExtraProps = () => {
    const parent = this._reactInternalFiber._debugOwner.stateNode;
    if (parent) {
      return parent.props.extraProps;
    }
  }

  _velidateExtraProps = () => {
    const { user, logo, config, logout } = this._getExtraProps();
    if (!(user && logo && config && logout)) {
      const req = { user, logo, config, logout };
      Object.keys(req).map(key => {
        const value = req[key];
        if (!value) {
          console.error(`Warning: Failed prop type: The prop '${key}' is marked as required in 'PrivateRoute' extraPros , but its value is '${value}'.`)
        }
      })
    }
  }

  componentDidUpdate(prevProps) {
    const { title } = this.props;
    if (title !== prevProps.title) {
      document.title = `ZINA${title ? ` | ${title}` : ''}`;
    }
    this._velidateExtraProps();
  }

  render() {
    const { children, title, loading, className } = this.props;
    const { user, logo, config } = this._getExtraProps();
    let childrens = children ? children : null;
    if (childrens) {
      childrens = Array.isArray(childrens)
        ? childrens
        : [this.props.children]
    }
    return (
      <ErrorBoundary>
        {loading && (
          <div className="loading">
            Loading ...
                        <BarLoader
              sizeUnit={'px'}
              size={200}
              color={'#fff'}
              loading={true}
            />
          </div>
        )}
        <div className={['zina', className].join(' ')}>
          <Drawer position="left" size={this.drawerSize}>
            {({
              position,
              size,
              swiping,
              translation,
              mainContentScroll,
              toggleDrawer,
              handleTouchStart,
              handleTouchMove,
              handleTouchEnd
            }) => (
                <div style={{ height: '100%' }}>
                  <DrawerContainer
                    position={position}
                    size={size}
                    swiping={swiping}
                    translation={translation}
                    toggleDrawer={toggleDrawer}
                    handleTouchStart={handleTouchStart}
                    handleTouchMove={handleTouchMove}
                    handleTouchEnd={handleTouchEnd}
                    drawerContent={
                      <div className="drawer">
                        <div className="navbar navbar-dark header">
                          <div className="navbar-brand">
                            <Link to="/">
                              <img
                                className="logo"
                                src={logo}
                                alt="zina"
                              />
                            </Link>
                          </div>
                          <div className="menu-btn">
                            <Button
                              onClick={toggleDrawer}
                              icon="bars"
                            ></Button>
                          </div>
                        </div>
                        <Menu show config={config} />
                      </div>
                    }
                  />
                  <MainContentContainer
                    translation={translation}
                    mainContentScroll={mainContentScroll}
                  >
                    <div className="content">

                      <Header
                        toggleDrawer={toggleDrawer}
                        onLogout={this._onLogout}
                        user={user}
                        logo={logo}
                      // notifications={nt}
                      />
                      <div className="maincontent">
                        <div className="menu">
                          <Menu config={config} />
                        </div>
                        <div className="sheet">
                          {this._computeBreadcrumb()}
                          <div className="container-fluid">
                            <div className="panel">
                              {/* <h3>{title}</h3>
                              <hr /> */}
                              <div className="page-content">
                                {this._computeChildrens(
                                  childrens
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <footer>
                        <span className="menu" />
                        <span className="legend">
                          Copyright <b>NOKIA</b> 2018 | Powered by <b>ZINA</b>
                        </span>
                      </footer>
                    </div>
                  </MainContentContainer>
                </div>
              )}
          </Drawer>
        </div>
      </ErrorBoundary>
    );
  }

  _computeChildrens = childrens =>
    childrens &&
    React.Children.toArray(childrens)
      .map((child, index) => {
        const op = {
          className: 'zina_card',
          key: `zina_card_${index}`
        };
        return (<ZinaCard {...op}>{child}</ZinaCard>);
      });

  _computeSize = (size = 250) => (size * 100) / window.innerWidth;

  _onLogout = event => {
    event.preventDefault();
    this.extraProps.logout();
  };

  _onChangeSize = () => {
    this.drawerSize = this._computeSize();
  };

  _computeBreadcrumb = () => {
    if (this.props.breadcrumbs) {
      const items = this.props.breadcrumbs.map((breadcrumb, index) => {
        const op = {
          key: `breadcrumb_${index}`,
          className: 'breadcrumb-item'
        };
        if (breadcrumb.rel) {
          return (
            <li {...op}>
              <Link to={breadcrumb.rel}>
                {breadcrumb.icon && (
                  <Icon icon={breadcrumb.icon} />
                )}{' '}
                {breadcrumb.name}
              </Link>
            </li>
          );
        } else {
          const op2 = {
            ...op,
            className: op.className + ' active',
            'aria-current': 'page'
          };
          return (
            <li {...op2}>
              {breadcrumb.icon && (
                <Icon icon={breadcrumb.icon} />
              )}
              {breadcrumb.name}
            </li>
          );
        }
      });
      return (
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb">{items}</ol>
        </nav>
      );
    }
  };
}

export default Base;


