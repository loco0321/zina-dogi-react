import React from 'react';
import { Route, Redirect } from 'react-router-dom';

export const PrivateRoute = (props) => {
    const { component: Component, extraProps, ...routerProps } = props;
    const render = (props) => {
        const op = Object.keys(extraProps).map(key => {
            if (!Object.keys(props).includes(key)) {
                return { [key]: extraProps[key] }
            }
        })
            .filter(obj => obj)
            .reduce((obj, item) => ({ ...obj, ...item }), {})
        const newProps = {
            ...props,
            ...{ extraProps: op },
        }
        return localStorage.getItem('user') ? (
            <Component {...newProps} />
        ) : (
                <Redirect
                    to={{ pathname: '/login', state: { from: props.location } }}
                />
            )
    };
    return <Route {...routerProps} render={render} />;
};
