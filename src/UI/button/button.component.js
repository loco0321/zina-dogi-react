import React from 'react';
// import MaterialIcon from 'material-icons-react';
// import './button.scss';

export default ({
    className,
    type,
    onClick,
    name,
    icon,
    color = '#fff',
    size = 20,
    ...args
}) => {
    const btn_op = {
        className: ['btn', 'zina-btn', className].join(' '),
        type,
        onClick,
        style: { color },
        ...args
    };
    const icon_op = { icon, color, size };
    return (
        <button {...btn_op}>
            {name}
        </button>
    );
};
