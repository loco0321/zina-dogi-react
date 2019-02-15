import React from 'react';
import { Route, Redirect } from 'react-router-dom';

export const PrivateRoute = ({ component: Component, extraProps, ...routerProps }) => {
    const render = (props) => {
        const newProps = {
          ...props,
          ...{extraProps},
        }
        return localStorage.getItem('user') ? (
            <Component {...newProps}/>
        ) : (
            <Redirect
                to={{ pathname: '/login', state: { from: props.location } }}
            />
        )
    };
    return <Route {...routerProps} render={render} />;
};
