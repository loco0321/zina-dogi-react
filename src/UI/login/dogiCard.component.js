import React, {Component} from 'react';
import PropTypes from 'prop-types'
import {Alert} from 'reactstrap';
import {LoginCarousel} from "./loginCarousel.component";

class DogiCard extends Component {

    render() {
        const year = new Date().getUTCFullYear();
        return (
            <div
                className="row container-fluid h-100 flex-column login-sheet"
                style={{
                    backgroundImage: `url(${this.props.fondo
                        ? this.props.fondo
                        : 'https://i.ytimg.com/vi/m_Rt5MobcUE/maxresdefault.jpg'
                        })`
                }}
            >
                {this.props.error &&
                    <Alert color="danger">
                        {this.props.error}
                    </Alert>}
                <div className="row flex-fill justify-content-center align-items-center zina-login">
                    <div className="row zina-login lcard">
                        <div className="col-6 lcard-left">
                            <LoginCarousel items={this.props.items} />
                        </div>
                        <div className="col-6 lcard-right">
                            <div className="logo-nokia">
                                {this.props.logo
                                    ? <img src={this.props.logo} alt="Nokia" />
                                    : <b>NOKIA</b>
                                }
                            </div>
                            {this.props.children && (this.props.children)}
                        </div>
                    </div>
                </div>
                <footer>
                    <span />
                    <span className="legend login" >
                        Copyright <b>NOKIA</b> © {year} | Powered by <b>ZINA</b>
                    </span>
                </footer>
            </div>
        );
    }
}

DogiCard.propTypes = {
    error: PropTypes.string, 
    logo: PropTypes.any,
    fondo: PropTypes.any,
    items: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.number.isRequired,
            src: PropTypes.string,
            cmp: PropTypes.element
        })
    ).isRequired
};


export default DogiCard;