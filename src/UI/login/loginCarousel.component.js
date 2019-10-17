import React, {Component} from "react";
import {Carousel, CarouselIndicators, CarouselItem} from "reactstrap";

export class LoginCarousel extends Component {
    constructor(props) {
        super(props);
        this.state = {activeIndex: 0};
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
        this.setState({activeIndex: nextIndex});
    }

    previous() {
        if (this.animating) return;
        const nextIndex =
            this.state.activeIndex === 0
                ? this.props.items.length - 1
                : this.state.activeIndex - 1;
        this.setState({activeIndex: nextIndex});
    }

    goToIndex(newIndex) {
        if (this.animating) return;
        this.setState({activeIndex: newIndex});
    }

    render() {
        const {activeIndex} = this.state;
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