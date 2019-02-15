import React from 'react';
import { DropdownMenu } from 'reactstrap';

// import './notification_panel.scss';

const NotificationPanel = ({ ...props }) => {
    props.className = ['card', props.className].join(' ');
    const { children, className } = props;

    return (
        <DropdownMenu className="notification" right>
            <div className={className}>
                <div className="card-header">
                    <span>Notifications</span>
                    <span>
                        (
                        {children
                            ? Array.isArray(children)
                                ? children.length
                                : 1
                            : 0}
                        )
                    </span>
                </div>
                <div className="card-body">
                    {children && <ul className="list-unstyled">{children}</ul>}
                </div>
            </div>
        </DropdownMenu>
    );
};

export default NotificationPanel;
