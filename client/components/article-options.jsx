import React from 'react';
import { Carousel, CarouselItem, CarouselControl, CarouselIndicators, Spinner } from 'reactstrap';
import AppContext from '../lib/app-context';
import ColorSelect from './color-select';
delete Carousel.childContextTypes; /* Was getting a warning to define a getChildContext method but carousel still worked, reacstrap library using legacy context
https://github.com/reactstrap/reactstrap/blob/106e6e4afb4c6cb9e0a00e692cfc487c5ed627b1/src/Carousel.js#L288 */

export default class ArticleOptions extends React.Component {
  constructor(props) {
    super(props);
    const articleType = this.props.articleType;
    this.state = {
      articleOptions: [
        {
          imgUrl: `images/${articleType}Placeholder.png`,
          articleId: 0,
          isPlaceholder: true,
          isInitialPlaceholder: true
        }
      ],
      currentArticle: {
        imgUrl: `images/${articleType}Placeholder.png`,
        articleId: 0,
        isPlaceholder: true,
        isInitialPlaceholder: true
      },
      activeIndex: 0,
      colorCategory: '',
      networkError: false,
      articlesLoaded: true
    };
    this.next = this.next.bind(this);
    this.previous = this.previous.bind(this);
    this.goToIndex = this.goToIndex.bind(this);
    this.handleColorSelect = this.handleColorSelect.bind(this);
    this.selectArticle = this.selectArticle.bind(this);
    this.onLoad = this.onLoad.bind(this);
  }

  handleColorSelect(event) {
    const colorCategory = event.target.value;
    const articleType = this.props.articleType;
    const userId = this.context.user.userId;
    const token = this.context.token;

    fetch(`/api/inventory/${userId}/${articleType}/${colorCategory}`, {
      headers: {
        'x-access-token': token
      }
    })
      .then(res => res.json())
      .then(articles => {
        this.setState({
          colorCategory,
          activeIndex: 0,
          articleOptions: articles,
          currentArticle: articles[0],
          articlesLoaded: false
        });
      })
      .catch(err => {
        console.error(err);
        this.setState({
          networkError: true
        });
      });
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

  selectArticle() {
    this.props.getArticle(this.state.currentArticle);
  }

  // clearState() {
  //   this.setState({
  //     articleOptions: [
  //       {
  //         imgUrl: `images/${this.props.articleType}Placeholder.png`,
  //         articleId: 0,
  //         isPlaceholder: true,
  //         isInitialPlaceholder: true
  //       }
  //     ],
  //     activeIndex: 0,
  //     colorCategory: '',
  //     currentArticle: {
  //       imgUrl: `images/${this.props.articleType}Placeholder.png`,
  //       articleId: 0,
  //       isPlaceholder: true,
  //       isInitialPlaceholder: true
  //     }
  //   });
  // }

  onLoad() {
    this.setState({
      articlesLoaded: true
    });
  }

  render() {
    const articleTypeHeader = this.props.articleType.charAt(0).toUpperCase() + this.props.articleType.slice(1);
    const currentArticle = this.state.currentArticle;
    let numItems;
    let numItemsClasses;
    let networkErrorClass = 'd-none';
    let spinnerClass = 'd-none';
    let spinnerImgClass = 'col-md-6 col-lg-5 d-none';
    let carouselClass = 'mw-100';

    if (!currentArticle.isInitialPlaceholder && currentArticle.isPlaceholder) {
      numItems = 'No matching items';
      numItemsClasses = 'text-danger';
    } else if (currentArticle.isInitialPlaceholder) {
      numItems = '';
    } else if (this.state.articleOptions.length === 1) {
      numItems = '1 Item';
    } else {
      numItems = `${this.state.articleOptions.length} Items`;
    }
    if (!this.state.articlesLoaded && !currentArticle.isPlaceholder) {
      spinnerClass = '';
      spinnerImgClass = 'col-12 d-flex align-items-center justify-content-center spinner-min-height';
      carouselClass = 'd-none';
    }
    if (this.state.networkError) {
      networkErrorClass = 'mt-4';
    }

    return (
      <div className="container container-max-width mt-3" onMouseLeave={this.selectArticle}>
        <div className="card border border-dark shadow">
          <div className="row d-flex justify-content-start">
            <div className="col-6 col-sm-4 d-flex justify-content-start">
              <div className={spinnerImgClass}>
                <Spinner className={spinnerClass} />
              </div>
              <Carousel
                className={carouselClass}
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
                      <img src={article.imgUrl} className="w-100 border border-dark" onLoad={this.onLoad}/>
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
            <div className="col-6 col-sm-8 ps-0">
              <div className="card-body ps-0 pb-0">
                <h5><u>{articleTypeHeader}</u></h5>
                <ColorSelect classes="col-12 my-3" selectClasses='form-select' colorCategory={this.state.colorCategory} value={this.state.colorCategory}
                  colorCategorySelect='Color' onChange={this.handleColorSelect} />
                <div className="col-12 d-sm-flex">
                  <div className="picker col-12 col-sm-6 d-flex align-items-end mt-2">
                    <div className="primary-square" style={{ backgroundColor: `${this.state.currentArticle.primaryColor}` }}></div>
                    <div className="secondary-square ms-2" style={{ backgroundColor: `${this.state.currentArticle.secondaryColor}` }}></div>
                  </div>
                  <div className="col-12 mt-2 col-sm-6 d-flex align-items-end justify-content-sm-end">
                    <span className={numItemsClasses}>{numItems}</span>
                  </div>
                </div>
              </div>
              <div className="row">
                <h6 className={networkErrorClass}>Sorry, there was an error connecting to the network!</h6>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

ArticleOptions.contextType = AppContext;
