import React from 'react';
// import './neoimporter.scss';
//TODO: Pass this to a function component when hooks are available and tested in React

const BGMAP = {
    error: 'callout-danger',
    info: 'callout-secondary',
    success: 'callout-success',
    warnings: 'callout-warning'
};

class CollapsibleResult extends React.Component {
    state = {
        open: false
    };
    render() {
        const callout_class = this.props.type
            ? BGMAP[this.props.type]
            : BGMAP['info'];
        return (
            <div className={['card', 'callout', callout_class].join(' ')}>
                <div className="card-header">
                    <h5 className="mb-0">
                        <button
                            className="btn btn-link"
                            type="button"
                            onClick={this.toggle}
                        >
                            {this.props.title}
                        </button>
                    </h5>
                </div>

                <div
                    className={['collapse', this.state.open ? 'show' : ''].join(
                        ' '
                    )}
                >
                    <div className={['card-body', this.props.type].join(' ')}>
                        <div className="row">
                            <div className="col-md-12">
                                {this.props.children}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    open = () => {
        this.setState({ open: true });
    };

    close = () => {
        this.setState({ open: false });
    };

    toggle = () => {
        this.setState({ open: !this.state.open });
    };
}

export default CollapsibleResult;
