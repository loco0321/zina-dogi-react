import React, { Component } from 'react';
import PropTypes from 'prop-types'
import { Formik, Form, Field } from 'formik';
import Select from 'react-select';
import { Carousel, CarouselItem, CarouselIndicators, Alert } from 'reactstrap';

class LoginCarousel extends Component {
    constructor(props) {
        super(props);
        this.state = { activeIndex: 0 };
        this.next = this.next.bind(this);
        this.previous = this.previous.bind(this);
        this.goToIndex = this.goToIndex.bind(this);
        this.onExiting = this.onExiting.bind(this);
        this.onExited = this.onExited.bind(this);
    }

    onExiting() {
        this.animating = true;
    }

    onExited() {
        this.animating = false;
    }

    next() {
        if (this.animating) return;
        const nextIndex =
            this.state.activeIndex === this.porps.items.length - 1
                ? 0
                : this.state.activeIndex + 1;
        this.setState({ activeIndex: nextIndex });
    }

    previous() {
        if (this.animating) return;
        const nextIndex =
            this.state.activeIndex === 0
                ? this.props.items.length - 1
                : this.state.activeIndex - 1;
        this.setState({ activeIndex: nextIndex });
    }

    goToIndex(newIndex) {
        if (this.animating) return;
        this.setState({ activeIndex: newIndex });
    }

    render() {
        const { activeIndex } = this.state;
        let slides = [];
        if (this.props.items) {
            slides = this.props.items.map(item => {
                return (
                    <CarouselItem
                        tag="div"
                        key={item.id}
                        onExiting={this.onExiting}
                        onExited={this.onExited}
                        interval={false}
                    >
                        <div className="zina-slide">
                            {item.src && (
                                <img
                                    src={item.src}
                                    alt={item.altText}
                                    width="100%"
                                />
                            )}
                            {item.cmp && (
                                <div className="text-slide">{item.cmp}</div>
                            )}
                        </div>
                    </CarouselItem>
                );
            });
        }


        return (
            <Carousel
                interval={false}
                activeIndex={activeIndex}
                next={this.next}
                previous={this.previous}
            >
                {slides}
                {slides.length > 1 && <CarouselIndicators
                    items={this.props.items ? this.props.items : []}
                    activeIndex={activeIndex}
                    onClickHandler={this.goToIndex}
                />}
            </Carousel>
        );
    }
}

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showLogin: true
        };
    }

    render() {
        return (
            <div
                className="row container-fluid h-100 flex-column login-sheet"
                style={{
                    backgroundImage: `url(${this.props.fondo
                        ? this.props.fondo
                        : 'https://i.ytimg.com/vi/m_Rt5MobcUE/maxresdefault.jpg'
                        })`
                }}
            >
                {this.props.error &&
                    <Alert color="danger">
                        {this.props.error}
                    </Alert>}
                <div className="row flex-fill justify-content-center align-items-center zina-login">
                    <div className="row zina-login lcard">
                        <div className="col-6 lcard-left">
                            <LoginCarousel items={this.props.items} />
                        </div>
                        <div className="col-6 lcard-right">
                            <div className="logo-nokia">
                                {this.props.nokiaLogo
                                    ? <img src={this.props.nokiaLogo} alt="Nokia" />
                                    : <b>NOKIA</b>
                                }
                            </div>
                            {this.state.showLogin && <LoginForm
                                showAccess={this.props.access}
                                onGoAccess={this.showAccessFn}
                                top={this.props.LoginTop}
                                bottom={this.props.LoginBottom}
                                onSubmit={this.props.onSubmitLogin}
                            />}
                            {(!this.state.showLogin && this.props.access) && <AccessForm
                                onGoLogin={this.showLoginFn}
                                onSubmit={this.props.onSubmitAccess}
                                projectOptions={this.props.projectOptions}
                                customTeamOptions={this.props.customTeamOptions}
                            />}
                        </div>
                    </div>
                </div>
                <footer>
                    <span />
                    <span className="legend login" >
                        Copyright <b>NOKIA</b> © 2018 | Powered by <b>ZINA</b>
                    </span>
                </footer>
            </div>
        );
    }

    showLoginFn = () => this.setState({ showLogin: true });

    showAccessFn = () => this.setState({ showLogin: false });
}

Login.propTypes = {
    LoginTop: PropTypes.element,
    LoginBottom: PropTypes.element,
    access: PropTypes.bool,
    items: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.number.isRequired,
            src: PropTypes.string,
            cmp: PropTypes.element
        })
    ).isRequired,
    onSubmitLogin: PropTypes.func.isRequired,
    onSubmitAccess: PropTypes.func,
    projectOptions: PropTypes.arrayOf(
        PropTypes.shape({
            value: PropTypes.oneOfType([
                PropTypes.number,
                PropTypes.string
            ]).isRequired,
            label: PropTypes.string.isRequired
        })
    ),
    customTeamOptions: PropTypes.arrayOf(
        PropTypes.shape({
            value: PropTypes.oneOfType([
                PropTypes.number,
                PropTypes.string
            ]).isRequired,
            label: PropTypes.string.isRequired
        })
    )
};

class LoginForm extends Component {
    initialValues = {
        username:
            process.env.REACT_APP_USER && process.env.NODE_ENV !== 'production'
                ? process.env.REACT_APP_USER
                : '',
        password:
            process.env.REACT_APP_PASSWORD &&
                process.env.NODE_ENV !== 'production'
                ? process.env.REACT_APP_PASSWORD
                : ''
    };

    render() {
        const { onGoAccess, showAccess } = this.props;
        return (
            <Formik
                className="loginForm"
                enableReinitialize={true}
                initialValues={this.initialValues}
                onSubmit={(values, cmp) => {
                    this.props.onSubmit(values, cmp);
                    cmp.resetForm();
                    cmp.setSubmitting(false);
                }}
            >
                {cpm => (
                    <Form className="form">
                        <div className="titles">
                            <b>Sign in</b>
                            <br />
                            {this.props.top && this.props.top}
                        </div>
                        <div className="fields">
                            <div className="form-group">
                                <Field
                                    type="text"
                                    className="form-control"
                                    placeholder="Username"
                                    name="username"
                                />
                            </div>
                            <div className="form-group">
                                <Field
                                    type="password"
                                    className="form-control"
                                    placeholder="Password"
                                    name="password"
                                />
                            </div>
                            <div className="links">
                                {this.props.bottom && this.props.bottom}
                            </div>
                        </div>
                        <div className="controls">
                            {showAccess && <button
                                type="reset"
                                className="btn btn-primary col"
                                onClick={onGoAccess}
                            >
                                Get Access
                            </button>}
                            <button type="submit" className="btn btn-success col">
                                Login
                            </button>
                        </div>
                    </Form>
                )}
            </Formik>
        );
    }
};
class AccessForm extends Component {
    initialValues = {
        username: '',
        email: '',
        first_name: '',
        last_name: '',
        nokia_id: '',
        password: '',
        re_password: '',
        custom_team: null,
        project: null
    };
    render() {
        const { onGoLogin } = this.props;
        return (
            <Formik
                className="accessForm"
                enableReinitialize={true}
                initialValues={this.initialValues}
                onSubmit={(values, cmp) => {
                    this.props.onSubmit(values, cmp);
                    this.props.onGoLogin()
                    cmp.resetForm();
                    cmp.setSubmitting(false);
                }}
            >
                {cpm => (
                    <Form className="form">
                        <div className="titles">
                            <b>Get access</b>
                            <br />
                            <sub>
                                Please insert data correctly to process request.
                            </sub>
                        </div>
                        <div className="fields">
                            <div className="form-group">
                                <Field
                                    type="text"
                                    className="form-control"
                                    placeholder="Username"
                                    name="username"
                                />
                            </div>
                            <div className="form-group">
                                <Field
                                    type="text"
                                    className="form-control"
                                    placeholder="First Name"
                                    name="first_name"
                                />
                            </div>
                            <div className="form-group">
                                <Field
                                    type="text"
                                    className="form-control"
                                    placeholder="Last Name"
                                    name="last_name"
                                />
                            </div>
                            <div className="form-group">
                                <Field
                                    type="email"
                                    className="form-control"
                                    placeholder="Email"
                                    name="email"
                                />
                            </div>
                            <div className="form-group">
                                <Field
                                    type="text"
                                    className="form-control"
                                    placeholder="Nokia ID"
                                    name="nokia_id"
                                />
                            </div>
                            {this.props.projectOptions && <div className="form-group">
                                <Field
                                    component={Select}
                                    name="project"
                                    placeholder="Select Project"
                                    classNamePrefix="zinaSelect"
                                    options={this.props.projectOptions}
                                    onChange={val =>
                                        this.handleChange(
                                            'project',
                                            val,
                                            cpm
                                        )
                                    }
                                />
                            </div>}
                            {this.props.customTeamOptions && <div className="form-group">
                                <Field
                                    component={Select}
                                    name="custom_team"
                                    placeholder="Select Custom Team"
                                    classNamePrefix="zinaSelect"
                                    options={this.props.customTeamOptions}
                                    onChange={val =>
                                        this.handleChange(
                                            'custom_team',
                                            val,
                                            cpm
                                        )
                                    }
                                />
                            </div>}
                            <div className="form-group">
                                <Field
                                    type="password"
                                    className="form-control"
                                    placeholder="Passsword"
                                    name="password"
                                />
                            </div>
                            <div className="form-group">
                                <Field
                                    type="password"
                                    className="form-control"
                                    placeholder="Repeat Password"
                                    name="re_password"
                                />
                            </div>
                        </div>
                        <div className="controls">
                            <button
                                type="reset"
                                className="btn btn-link col"
                                onClick={onGoLogin}
                            >
                                Go Back
                            </button>
                            <button type="submit" className="btn btn-success col">
                                Send Request
                            </button>
                        </div>
                    </Form>
                )}
            </Formik>
        );
    }

    handleChange = (key, value, cpm) => {
        const { setFieldValue } = cpm;
        setFieldValue(key, value.value, false);
    };
}

export default Login;