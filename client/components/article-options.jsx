import React, { useState, useEffect, useContext, useRef } from 'react';
import { Carousel, CarouselItem, CarouselControl, CarouselIndicators, Spinner } from 'reactstrap';
import AppContext from '../lib/app-context';
import ColorSelect from './color-select';
delete Carousel.childContextTypes; /* Was getting a warning to define a getChildContext method but carousel still worked, reacstrap library using legacy context
https://github.com/reactstrap/reactstrap/blob/106e6e4afb4c6cb9e0a00e692cfc487c5ed627b1/src/Carousel.js#L288 */

export default function ArticleOptions(props) {
  const placeholderArticle = {
    imgUrl: `images/${props.articleType}Placeholder.png`,
    articleId: 0,
    isPlaceholder: true,
    isInitialPlaceholder: true
  };
  const [articleOptions, setArticleOptions] = useState([placeholderArticle]);
  const [currentArticle, setCurrentArticle] = useState(placeholderArticle);
  const [activeIndex, setActiveIndex] = useState(0);
  const [colorCategory, setColorCategory] = useState('');
  const [networkError, setNetworkError] = useState(false);
  const [articlesLoaded, setArticlesLoaded] = useState(true);
  const { user } = useContext(AppContext);
  const { token } = useContext(AppContext);
  const userId = user.userId;
  const initialRender = useRef(true);

  useEffect(async () => {
    if (initialRender.current) {
      initialRender.current = false;
      return;
    }
    const articleType = props.articleType;
    try {
      const response = await fetch(`/api/inventory/${userId}/${articleType}/${colorCategory}`, {
        headers: {
          'x-access-token': token
        }
      });
      const articles = await response.json();
      setActiveIndex(0);
      setArticleOptions(articles);
      setCurrentArticle(articles[0]);
      setArticlesLoaded(false);
    } catch (err) {
      console.error(err);
      setNetworkError(true);
    }
  }, [colorCategory]);

  useEffect(() => {
    props.getArticle(currentArticle);
  }, [currentArticle]);

  function next() {
    let newIndex;
    activeIndex === articleOptions.length - 1 ? newIndex = 0 : newIndex = activeIndex + 1;
    const currentArticle = articleOptions[newIndex];
    setActiveIndex(newIndex);
    setCurrentArticle(currentArticle);
  }

  function previous() {
    let newIndex;
    activeIndex === 0 ? newIndex = articleOptions.length - 1 : newIndex = activeIndex - 1;
    const currentArticle = articleOptions[newIndex];
    setActiveIndex(newIndex);
    setCurrentArticle(currentArticle);
  }

  function goToIndex(newIndex) {
    const currentArticle = articleOptions[newIndex];
    setActiveIndex(newIndex);
    setCurrentArticle(currentArticle);
  }

  const articleTypeHeader = props.articleType.charAt(0).toUpperCase() + props.articleType.slice(1);
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
  } else if (articleOptions.length === 1) {
    numItems = '1 Item';
  } else {
    numItems = `${articleOptions.length} Items`;
  }
  if (!articlesLoaded && !currentArticle.isPlaceholder) {
    spinnerClass = '';
    spinnerImgClass = 'col-12 d-flex align-items-center justify-content-center spinner-min-height';
    carouselClass = 'd-none';
  }
  if (networkError) {
    networkErrorClass = 'mt-4';
  }

  return (
    <div className="container container-max-width mt-3">
      <div className="card border border-dark shadow">
        <div className="row d-flex justify-content-start">
          <div className="col-6 col-sm-4 d-flex justify-content-start">
            <div className={spinnerImgClass}>
              <Spinner className={spinnerClass} />
            </div>
            <Carousel
              className={carouselClass}
              activeIndex={activeIndex}
              next={next}
              previous={previous}
              interval={null}
            >
              <CarouselIndicators
                activeIndex={activeIndex}
                items={articleOptions}
                onClickHandler={goToIndex}
              />
              {
                articleOptions.map(article => (
                  <CarouselItem key={article.articleId}>
                    <img src={article.imgUrl} className="w-100 border border-dark" onLoad={() => setArticlesLoaded(true)}/>
                  </CarouselItem>
                ))
              }
              <CarouselControl
                direction="prev"
                directionText="Previous"
                onClickHandler={previous}
              />
              <CarouselControl
                direction="next"
                directionText="Next"
                onClickHandler={next}
              />
            </Carousel>
          </div>
          <div className="col-6 col-sm-8 ps-0">
            <div className="card-body ps-0 pb-0">
              <h5><u>{articleTypeHeader}</u></h5>
              <ColorSelect classes="col-12 my-3" selectClasses='form-select' colorCategory={colorCategory} value={colorCategory}
                colorCategorySelect='Color' onChange={() => setColorCategory(event.target.value)}/>
              <div className="col-12 d-sm-flex">
                <div className="picker col-12 col-sm-6 d-flex align-items-end mt-2">
                  <div className="primary-square" style={{ backgroundColor: `${currentArticle.primaryColor}` }}></div>
                  <div className="secondary-square ms-2" style={{ backgroundColor: `${currentArticle.secondaryColor}` }}></div>
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
