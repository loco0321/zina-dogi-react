import React, {Component} from 'react';
import PropTypes from 'prop-types'
import DogiCard from "./dogiCard.component";
import {LoginForm} from "./loginForm.component";
import {AccessForm} from "./accesForm.component";


class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showLogin: true
        };
    }

    render() {
        const {error, nokiaLogo, fondo, items} = this.props;
        const dogi_card_props = {
            error, logo: nokiaLogo, fondo, items
        };
        return ( 
            <DogiCard {...dogi_card_props}>
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
            </DogiCard>
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

export default Login;