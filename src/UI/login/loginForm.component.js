import React, {Component} from "react";
import {Field, Form, Formik} from "formik";

export class LoginForm extends Component {
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
        const {onGoAccess, showAccess} = this.props;
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
                            <br/>
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
}