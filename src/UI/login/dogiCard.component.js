import React, { Component } from 'react';
import PropTypes from 'prop-types'
import { Carousel, CarouselItem, CarouselIndicators, Alert } from 'reactstrap';

class LoginCarousel extends Component {
    constructor(props) {
        super(props);
        this.state = { activeIndex: 0 };
        this.next = this.next.bind(this);
        this.previous = this.previous.bind(this);
        this.goToIndex = this.goToIndex.bind(this);
        this.onExiting = this.onExiting.bind(this);
        this.onExited = this.onExited.bind(this);
    }

    onExiting() {
        this.animating = true;
    }

    onExited() {
        this.animating = false;
    }

    next() {
        if (this.animating) return;
        const nextIndex =
            this.state.activeIndex === this.porps.items.length - 1
                ? 0
                : this.state.activeIndex + 1;
        this.setState({ activeIndex: nextIndex });
    }

    previous() {
        if (this.animating) return;
        const nextIndex =
            this.state.activeIndex === 0
                ? this.props.items.length - 1
                : this.state.activeIndex - 1;
        this.setState({ activeIndex: nextIndex });
    }

    goToIndex(newIndex) {
        if (this.animating) return;
        this.setState({ activeIndex: newIndex });
    }

    render() {
        const { activeIndex } = this.state;
        let slides = [];
        if (this.props.items) {
            slides = this.props.items.map(item => {
                return (
                    <CarouselItem
                        tag="div"
                        key={`carousel_item_${item.id}`}
                        onExiting={this.onExiting}
                        onExited={this.onExited}
                        interval={false}
                    >
                        <div className="zina-slide">
                            {item.src && (
                                <img
                                    src={item.src}
                                    alt={item.altText}
                                    width="100%"
                                />
                            )}
                            {item.cmp && (
                                <div className="text-slide">{item.cmp}</div>
                            )}
                        </div>
                    </CarouselItem>
                );
            });
        }


        return (
            <Carousel
                interval={false}
                activeIndex={activeIndex}
                next={this.next}
                previous={this.previous}
            >
                {slides}
                {slides.length > 1 && <CarouselIndicators
                    items={this.props.items ? this.props.items : []}
                    activeIndex={activeIndex}
                    onClickHandler={this.goToIndex}
                />}
            </Carousel>
        );
    }
}

class DogiCard extends Component {

    render() {
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
                        Copyright <b>NOKIA</b> © {new Date().getUTCFullYear()} | Powered by <b>ZINA</b>
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