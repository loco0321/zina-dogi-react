import React, {Component} from "react";
import {Card, CardBody, CardHeader, Col, Collapse, Row} from "reactstrap";
import ReactDOMServer from "react-dom/server";

export class ZinaCard extends Component {
    state = {
        header: null,
        collapse: false
    };
    componentDidMount() {
        if(this.props.children.props.collapse){
            this._close();
        }else{
            this._open();
        }
    }

    render() {
        const {children, ...props} = this.props;
        const isDomTag = typeof children.type === "string";
        let header = this._updateHeader();
        let clone = React.cloneElement(children, {
            setheader: this._setHeader,
            togglecollapse: this._toggle,
            iscollapse: this.state.collapse
        });
        if (!header) {
            header = this.state.header;
        } else {
            clone = children
        }
        return (
            <Row>
                <Col sm={12}>
                    <Card {...props}>
                        {header && <CardHeader>
                            {header}
                        </CardHeader>}
                        <Collapse isOpen={!this.state.collapse}>
                            <CardBody>
                                {isDomTag && children}
                                {!isDomTag && clone}
                            </CardBody>
                        </Collapse>
                    </Card>
                </Col>
            </Row>
        )
    }

    _toggle = () => {
        this.setState({collapse: !this.state.collapse});
    };

    _open = () => {
        this.setState({collapse: false})
    }

    _close = () => {
        this.setState({collapse: true})
    }

    _getElementStr = ele => ReactDOMServer.renderToString(ele);

    _setHeader = header => {
        if (this._getElementStr(this.state.header) !== this._getElementStr(header)) {
            this.setState({header})
        }
    };

    _updateHeader = () => {
        const {children} = this.props;
        const isDomTag = typeof children.type === "string";
        if (!isDomTag) {
            const {header} = children.type;
            if (header) {
                switch (typeof header) {
                    case 'function':
                        return header({
                            togglecollapse: this._toggle,
                            iscollapse: this.state.collapse,
                            open: this._open,
                            close: this._close
                        }, children.props);
                    case 'object':
                        return header;
                    default:
                        return false;
                }
            }
        }

    }
}