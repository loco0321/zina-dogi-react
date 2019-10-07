import React from 'react';
import PropTypes from "prop-types";

const Notification = ({ img, title, message, className }) => {
    className = ['media', 'align-items-center', className].join(' ');
    return (
        <li className={className}>
            {img && <img className="mr-3" src={img} alt="notification" />}
            <div className="media-body">
                {title && <h5 className="mt-0 mb-1">{title}</h5>}
                {message && <span>{message}</span>}
            </div>
        </li>
    );
};

Notification.propTypes= {
    img: PropTypes.string,
    title: PropTypes.string,
    message: PropTypes.string,
    className: PropTypes.string
}

export default Notification;
