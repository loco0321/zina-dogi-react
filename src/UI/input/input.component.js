import React from 'react';

export default ({ title, className, ...args }) => {
    className = `form-group zina-input${className ? ` ${className}` : ''}`;
    return (
        <div className={className}>
            <label>{title}</label>
            <input {...args} className="form-control" />
        </div>
    );
};
