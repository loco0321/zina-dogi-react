import React from 'react';
import Icon from '../icon/icon.component'

const paginator = props => {
    return (
        <ul className="pagination">
            <li
                className="page-item"
                onClick={() => {
                    props.previous && props.changePage(props.previous);
                }}
            >
                <a className="page-link">
                    <Icon
                        className={btnClass(props.previous)}
                        icon='chevron-left'
                    />
                </a>
            </li>
            <li className="page-item input">
                <input
                    className="form-control paginator"
                    type="text"
                    defaultValue={props.actualPage}
                    onKeyPress={evt => {
                        if (evt.key === 'Enter') {
                            let { value } = document.querySelector(
                                '.form-control.paginator'
                            );
                            if (!value || value === '') {
                                value = 1;
                            }
                            value > props.pages
                                ? props.changePage(props.pages)
                                : props.changePage(value);
                        }
                    }}
                />
            </li>
            <li className="page-item separator">of</li>
            <li className="page-item total">{props.pages}</li>
            <li
                className="page-item"
                onClick={() => {
                    props.next && props.changePage(props.next);
                }}
            >
                <a className="page-link">
                    <Icon
                        className={btnClass(props.next)}
                        icon="chevron-right"
                    />
                </a>
            </li>
        </ul>
    );
};

const btnClass = value => {
    let classes = [];
    if (!value) {
        classes.push('disabled');
    }
    return classes.join(' ');
};

export default paginator;
