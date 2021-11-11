import React from 'react';
import { Carousel, CarouselItem, CarouselControl, CarouselIndicators } from 'reactstrap';
import ColorSelect from './color-select';
delete Carousel.childContextTypes; /* Was getting a warning to define a getChildContext method but carousel still worked, reacstrap library using legacy context
https://github.com/reactstrap/reactstrap/blob/106e6e4afb4c6cb9e0a00e692cfc487c5ed627b1/src/Carousel.js#L288 */

export default class ArticleOptions extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      articleOptions: [
        {
          imgUrl: 'images/topsPlaceholder.png',
          articleId: 'placeholder',
          isInitialPlaceholder: true
        }
      ],
      activeIndex: 0,
      colorCategory: '',
      currentArticle: {
        imgUrl: 'images/topsPlaceholder.png',
        articleId: 'placeholder',
        isInitialPlaceholder: true
      }
    };
    this.next = this.next.bind(this);
    this.previous = this.previous.bind(this);
    this.goToIndex = this.goToIndex.bind(this);
    this.handleColorSelect = this.handleColorSelect.bind(this);
  }

  handleColorSelect(event) {
    const colorCategory = event.target.value;
    fetch(`/api/inventory/1/tops/${colorCategory}`)
      .then(res => res.json())
      .then(articles => {
        this.setState({
          colorCategory,
          articleOptions: articles,
          currentArticle: articles[0]
        });
      })
      .catch(err => (console.error(err)));
  }

  next() {
    let newIndex;
    this.state.activeIndex === this.state.articleOptions.length - 1 ? newIndex = 0 : newIndex = this.state.activeIndex + 1;
    const currentArticle = this.state.articleOptions[newIndex];
    this.setState({
      activeIndex: newIndex,
      currentArticle
    });
  }

  previous() {
    let newIndex;
    this.state.activeIndex === 0 ? newIndex = this.state.articleOptions.length - 1 : newIndex = this.state.activeIndex - 1;
    const currentArticle = this.state.articleOptions[newIndex];
    this.setState({
      activeIndex: newIndex,
      currentArticle
    });
  }

  goToIndex(newIndex) {
    this.setState({ activeIndex: newIndex });
  }

  render() {
    const currentArticle = this.state.currentArticle;
    let numItems;
    let numItemsClasses;

    if (!currentArticle.isInitialPlaceholder && currentArticle.articleId === 'placeholder') {
      numItems = 'No matching items';
      numItemsClasses = 'text-danger';
    } else if (currentArticle.isInitialPlaceholder) {
      numItems = '';
    } else if (this.state.articleOptions.length === 1) {
      numItems = '1 Item';
    } else {
      numItems = `${this.state.articleOptions.length} Items`;
    }

    return (
      <div className="container container-max-width mt-5">
        <div className="card border border-dark shadow">
          <div className="row d-flex justify-content-center justify-content-md-start">
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
                  this.state.articleOptions.map(article => (
                    <CarouselItem key={article.articleId}>
                      <img src={article.imgUrl} className="article-option-max-width border border-dark" />
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
                <h5 className="d-none d-md-block"><u>Tops Picker</u></h5>
                <ColorSelect classes="col-9 col-md-12 mx-auto my-md-4" selectClasses='form-select' colorCategory={this.state.colorCategory} value={this.state.colorCategory}
                  colorCategorySelect='Color' onChange={this.handleColorSelect} />
                <div className="col-9 col-md-12 mx-auto d-flex">
                  <div className="picker col-4 d-flex align-items-end mt-2">
                    <div className="primary-square" style={{ backgroundColor: `${this.state.currentArticle.primaryColor}` }}></div>
                    <div className="secondary-square ms-2" style={{ backgroundColor: `${this.state.currentArticle.secondaryColor}` }}></div>
                  </div>
                  <div className="col-8 d-flex align-items-end justify-content-end">
                    <span className={numItemsClasses}>{numItems}</span>
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
