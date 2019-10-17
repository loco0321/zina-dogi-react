import React from 'react';
import PropTypes from 'prop-types'
import { Button } from 'reactstrap';
import Icon from '../icon/icon.component'
// import './button.scss';

const ButtonX = ({
    icon,
    iconType,
    className,
    children,
    ...args
}) => {
    const btn_op = {
        className: ['btn', 'zina-btn', className].join(' '),
        ...args
    };
    return (
        <Button {...btn_op}>
            {icon && [
              <Icon icon={icon} type={iconType} key="btn-icon"/>,
              <span className="btn-sparator" key="btn-sparator">{' '}</span>
            ]}

            {children}
        </Button>
    );
};

Button.propTypes = {
  icon: PropTypes.string,
  iconType: PropTypes.string
};

export default ButtonX;
