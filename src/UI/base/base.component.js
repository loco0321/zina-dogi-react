import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import ErrorBoundary from '../bonduary/ErrorBonduary';
import Drawer, { DrawerContainer, MainContentContainer } from 'react-swipeable-drawer';
import Header from '../header/header.component'
import Menu, { config_propType } from '../menu/menu.component';
import Icon from '../icon/icon.component'
import Button from '../button/button.component';
import BarLoader from 'react-spinners/BarLoader';
import { ZinaCard } from "./zinaCard.component";


class Base extends Component {
    static propTypes = {
        loading: PropTypes.bool.isRequired,
        title: PropTypes.string,
        showUserMenu: PropTypes.bool,
        notifiable: PropTypes.bool,

        extraProps: PropTypes.shape({
            extraMenu: PropTypes.func,
            user: PropTypes.object.isRequired,
            logo: PropTypes.string.isRequired,
            config: config_propType,
            notification: PropTypes.shape({
                page: PropTypes.string,
                component: PropTypes.func,
                list: PropTypes.array.isRequired
            }),
            logout: PropTypes.func.isRequired,
        }).isRequired
    };

    static defaultProps = {
        showUserMenu: true,
        notifiable: true,
    }

    constructor(props) {
        super(props);
        this.state = {
            drawerSize: this._computeSize()
        }
    }

    componentDidMount() {
        const { title } = this.props;
        document.title = `ZINA${title ? ` | ${title}` : ''}`;
        window.addEventListener('resize', this._onChangeSize);
    }

    componentDidUpdate(prevProps) {
        const { title } = this.props;
        if (title !== prevProps.title) {
            document.title = `ZINA${title ? ` | ${title}` : ''}`;
        }
    }

    componentWillUnmount() {
        window.removeEventListener("resize", this._onChangeSize);
    }

    render() {
        const { children, title, loading, className, extraProps: { user, logo, config, extraMenu, notification, copyright } } = this.props;
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
                            size={250}
                            color={'#fff'}
                            loading={true}
                        />
                    </div>
                )}
                <div className={['zina', className].join(' ')}>
                    <Drawer position="left" size={this.state.drawerSize}>
                        {(args) => {
                            const {
                                position,
                                size,
                                swiping,
                                translation,
                                mainContentScroll,
                                toggleDrawer,
                                handleTouchStart,
                                handleTouchMove,
                                handleTouchEnd
                            } = args;
                            return (
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
                                                    <div className="menu-btn">
                                                        <Button
                                                            onClick={toggleDrawer}
                                                            icon="bars"
                                                        ></Button>
                                                    </div>
                                                    <div className="navbar-brand">
                                                        <Link to="/">
                                                            <img
                                                                className="logo"
                                                                src={logo}
                                                                alt="zina"
                                                            />
                                                        </Link>
                                                    </div>
                                                </div>
                                                <Menu show config={config} toggleDrawer={toggleDrawer} />
                                            </div>
                                        }
                                    />
                                    <MainContentContainer
                                        translation={translation}
                                        mainContentScroll={mainContentScroll}
                                    >
                                        {this.renderContent(toggleDrawer, user, logo, extraMenu, notification, config, title, childrens, copyright)}
                                    </MainContentContainer>
                                </div>
                            )
                        }}
                    </Drawer>
                </div>
            </ErrorBoundary>
        );
    }

    _computeChildrens = childrens => {
        if (childrens) {
            return React.Children.toArray(childrens)
                .map((child, index) => {
                    const op = {
                        className: 'zina_card',
                        key: `zina_card_${index}`
                    };
                    return (<ZinaCard {...op}>{child}</ZinaCard>);
                });
        }
        return null
    };
    _computeSize = (size = 250) => (size * 100) / window.innerWidth;

    _onLogout = event => {
        event.preventDefault();
        this.props.extraProps.logout();
    };

    _onChangeSize = () => {
        const drawerSize = this._computeSize();
        if (this.state.drawerSize !== drawerSize) {
            this.setState({ drawerSize })
        }
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

    renderContent(toggleDrawer, user, logo, extraMenu, notification, config, title, childrens, copyright) {
        return <div className="content">
            <Header 
                notifiable={this.props.notifiable}
                showUserMenu={this.props.showUserMenu}
                toggleDrawer={toggleDrawer}
                onLogout={this._onLogout}
                user={user}
                logo={logo}
                extraMenu={extraMenu}
                notification={notification}
            />
            <div className="maincontent">
                <div className="menu">
                    <Menu config={config} toggleDrawer={toggleDrawer} />
                </div>
                <div className="sheet">
                    {this._computeBreadcrumb()}
                    <div className="container-fluid">
                        <div className="panel">
                            {title && <h3>{title}</h3>}
                            <div className="page-content">
                                {this._computeChildrens(childrens)}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <footer>
                <span className="menu" />
                {!copyright && <span className="legend">
                    Copyright <b>NOKIA</b> {new Date().getFullYear()} | Powered by <b>ZINA</b>
                </span>}
                {copyright && <span className="legend">
                    {copyright}
                </span>}
            </footer>
        </div>;
    }
}

export default Base;


