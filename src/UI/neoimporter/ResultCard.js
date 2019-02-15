import React from 'react';

const BGMAP = {
    error: 'bg-danger',
    info: 'bg-secondary',
    success: 'bg-success',
    warnings: 'bg-warning'
};

const resultcard = props => {
    return (
        <React.Fragment>
            <div
                className={[
                    'card',
                    'text-white',
                    `${BGMAP[props.type]}`,
                    'mb-3'
                ].join(' ')}
            >
                <div className="card-body">
                    <h5 className="card-title">{props.total}</h5>
                    <h6 className="card-subtitle mb-2">
                        {props.content} {props.verb}
                    </h6>
                </div>
            </div>
        </React.Fragment>
    );
};

export default resultcard;
