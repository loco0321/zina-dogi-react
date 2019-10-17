import React from 'react';
import { DropdownMenu, Badge } from 'reactstrap';
import { NavLink } from 'react-router-dom'
// import './notification_panel.scss';

const NotificationPanel = ({ className, children, page, size}) => {
    className = ['card', className].join(' ');
    const hasChildren = Array.isArray(children)&& children.length > 0;
    return (
        <DropdownMenu className="notification" right>
            <div className={className}>
                <div className="card-header" >
                    <span>Notifications</span>
                    {'  '}
                    <span>
                        {size > 0 && <Badge color="danger" pill>
                            {size}    
                        </Badge>}
                    </span>
                </div>
                <div className="card-body">
                    {hasChildren && <ul className="list-unstyled">{children}</ul>}
                    {!hasChildren && <span>You have no notifications at this time</span>}
                </div>
                {page && <div className="card-header">
                    <span>
                        <NavLink className="link-page" to={page}>View All</NavLink>
                    </span>
                </div>}
            </div>
        </DropdownMenu>
    );
};

export default NotificationPanel;
