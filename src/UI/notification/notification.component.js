import React from 'react';

const Notification = ({ img, title, message, ...props }) => {
    props.className = ['media', 'align-items-center', props.className].join(
        ' '
    );
    return (
        <li {...props}>
            {img && <img className="mr-3" src={img} alt="notification" />}
            <div className="media-body">
                {title && <h5 className="mt-0 mb-1">{title}</h5>}
                {message && <span>{message}</span>}
            </div>
        </li>
    );
};

export default Notification;
