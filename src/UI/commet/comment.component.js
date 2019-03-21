import React from 'react';
import moment from 'moment-timezone/builds/moment-timezone-with-data';
// style
// import './comment.scss';

export const Comment = ({ type, message, date, username, ...others }) => {
    others.className = `comment ${type}-comment${
        others.className ? ` ${others.className}` : ''
    }`;
    return (
        <li {...others}>
            <div className="info">
                <a>{username}</a>
                <span>
                    {date}
                </span>
            </div>
            <p>{message}</p>
        </li>
    );
};
