import React, {Component} from "react";
import {Field, Form, Formik} from "formik";
import Select from "react-select";

export class AccessForm extends Component {
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
        const {onGoLogin} = this.props;
        return (
            <Formik
                className="accessForm"
                enableReinitialize={true}
                initialValues={this.initialValues}
                onSubmit={(values, cmp) => {
                    this.props.onSubmit(values, cmp);
                    this.props.onGoLogin();
                    cmp.resetForm();
                    cmp.setSubmitting(false);
                }}
            >
                {cpm => (
                    <Form className="form">
                        <div className="titles">
                            <b>Get access</b>
                            <br/>
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
                                    name="sub_project"
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
        const {setFieldValue} = cpm;
        setFieldValue(key, value.value, false);
    };
}