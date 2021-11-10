import React from 'react';
import { Carousel, CarouselItem, CarouselControl, CarouselIndicators } from 'reactstrap';
import ColorSelect from './color-select';

// const items = [
//   {
//     altText: 'Slide 1',
//     caption: 'Slide 1',
//     key: 1,
//     src: 'https://picsum.photos/id/123/1200/600'
//   },
//   {
//     altText: 'Slide 2',
//     caption: 'Slide 2',
//     key: 2,
//     src: 'https://picsum.photos/id/456/1200/600'
//   },
//   {
//     altText: 'Slide 3',
//     caption: 'Slide 3',
//     key: 3,
//     src: 'https://picsum.photos/id/678/1200/600'
//   }
// ];

export default class ArticleOptions extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      articleOptions: [
        {
          altText: 'Slide 1',
          caption: '',
          key: 1,
          src: 'images/image-1636497815679.JPEG'
        },
        {
          altText: 'Slide 2',
          caption: '',
          key: 2,
          src: 'images/image-1636498254972.JPEG'
        },
        {
          altText: 'Slide 3',
          caption: '',
          key: 3,
          src: 'images/image-1636498335645.JPEG'
        }
      ],
      activeIndex: 0
    };
    this.next = this.next.bind(this);
    this.previous = this.previous.bind(this);
    this.goToIndex = this.goToIndex.bind(this);
  }

  next() {
    let newIndex;
    this.state.activeIndex === this.state.articleOptions.length - 1 ? newIndex = 0 : newIndex = this.state.activeIndex + 1;
    this.setState({
      activeIndex: newIndex
    });
  }

  previous() {
    let newIndex;
    this.state.activeIndex === 0 ? newIndex = this.state.articleOptions.length - 1 : newIndex = this.state.activeIndex - 1;
    this.setState({
      activeIndex: newIndex
    });
  }

  goToIndex(newIndex) {
    this.setState({ activeIndex: newIndex });
  }

  render() {
    const numItems = ` ${this.state.articleOptions.length} Items`;

    return (
      <div className="container container-max-width mt-5">
        <div className="card border-dark border-2">
          <div className="row g-0 d-flex justify-content-center justify-content-md-start">
            <div className="col-12 col-md-4 d-flex justify-content-center justify-content-md-start">
              <Carousel
                activeIndex={this.state.activeIndex}
                next={this.next}
                previous={this.previous}
                interval={null}
              >
                <CarouselIndicators
                  activeIndex={this.state.activeIndex}
                  items={this.state.articleOptions}
                  onClickHandler={this.goToIndex}
                />
                {
                  this.state.articleOptions.map(item => (
                    <CarouselItem key={item.src}>
                      <img src={item.src} alt={item.altText} className="border border-2 border-dark" />
                    </CarouselItem>
                  ))
                }
                <CarouselControl
                  direction="prev"
                  directionText="Previous"
                  onClickHandler={this.previous}
                />
                <CarouselControl
                  direction="next"
                  directionText="Next"
                  next={this.handleNext}
                  onClickHandler={this.next}
                />
              </Carousel>
            </div>
            <div className="col-md-8">
              <div className="card-body">
                <h5 className="d-none d-sm-block"><u>Outfit Picker</u></h5>
                <ColorSelect classes="col-9 col-md-12 mx-auto mx-md-0" selectClasses='form-select' colorCategory={this.state.colorCategory} value={this.state.colorCategory}
                  colorCategorySelect='Color' />
                <div className="col-9 col-md-12 mx-auto d-flex">
                  <div className="col-6 d-flex align-items-end mt-2">
                    <a><div className="primary-square" style={{ backgroundColor: `${this.state.primaryColor}` }}></div></a>
                    <a><div className="secondary-square ms-2" style={{ backgroundColor: `${this.state.secondaryColor}` }}></div></a>
                  </div>
                  <div className="col-6 d-flex align-items-end justify-content-end">
                    <span>{numItems}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
