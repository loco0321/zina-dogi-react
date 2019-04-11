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

class ZinaCard extends Component {
    state = {
        header: null,
        collapse: false
    }

    render() {
        const { children, ...props } = this.props;
        const isDomTag = typeof children.type === "string";
        let header = this._updateHeader();
        const upgradeable = !header || !isDomTag;
        console.log({name: children.type.name,  upgradeable});
        if (!header){
            header = this.state.header
        }
        console.log(header);
        
        return (
            <Card {...props}>
                {header && <CardHeader>
                    {header}
                </CardHeader>}
                <Collapse isOpen={!this.state.collapse}>
                    <CardBody>
                        {!upgradeable && children}
                        {upgradeable && React.cloneElement(children, {
                            setheader: this._setHeader,
                            togglecollapse: this._toggle,
                            iscollapse: this.state.collapse
                        })}
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

    _updateHeader = () => {
        const { children } = this.props;
        const isDomTag = typeof children.type === "string";
        if (!isDomTag) {
            const { header } = children.type;
            if(header){
                switch (typeof header) {
                    case 'function':
                        return header({
                            togglecollapse: this._toggle,
                            iscollapse: this.state.collapse
                        });
                    case 'object': 
                        return header;
                    default:
                        return false;
                } 
            }
        }
        
    }
}

class Base extends Component {
    static propTypes = {
        loading: PropTypes.bool.isRequired,
        title: PropTypes.string,
        nt: PropTypes.array,
        extraProps: PropTypes.shape({
            user: PropTypes.object.isRequired,
            logo: PropTypes.string.isRequired,
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
            logout: PropTypes.func.isRequired,
        }).isRequired
    };

    constructor(props) {
        super(props);
        this.drawerSize = this._computeSize();
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

    render() {
        const { children, title, loading, className, extraProps: { user, logo, config, extraMenu } } = this.props;
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
                            } = args
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
                                                <Menu show config={config} toggleDrawer={toggleDrawer} />
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
                                                extraMenu={extraMenu}
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
                            )
                        }}
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
        this.props.extraProps.logout();
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


