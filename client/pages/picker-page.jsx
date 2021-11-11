import React from 'react';
import Navbar from '../components/navbar';
import AppDrawer from '../components/app-drawer';
import ArticleOptions from '../components/article-options';

export default class PickerPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      topArticleId: null,
      bottomArticleId: null,
      shoesArticleId: null
    };
    this.topArticleId = React.createRef();
    this.handleCurrentArticle = this.handleCurrentArticle.bind(this);
  }

  handleCurrentArticle(currentArticle) {
    const articleTypeId = currentArticle.articleTypeId;
    const articleId = currentArticle.articleId;
    if (articleTypeId === 1) {
      this.setState({
        topArticleId: articleId
      });
    } else if (articleTypeId === 2) {
      this.setState({
        bottomArticleId: articleId
      });
    } else if (articleTypeId === 3) {
      this.setState({
        shoesArticleId: articleId
      });
    }
  }

  render() {

    return (
      <>
        <Navbar pageHeader='Outfit Picker' />
        <AppDrawer />
        <div className="container">
          <ArticleOptions articleType='tops' mouseLeave={this.handleCurrentArticle}/>
          <ArticleOptions articleType='bottoms' mouseLeave={this.handleCurrentArticle}/>
          <ArticleOptions articleType='shoes' mouseLeave={this.handleCurrentArticle}/>
          <div className="row my-3">
            <div className="col-12 d-flex justify-content-center">
              <button className="btn btn-primary">Add to Outfits</button>
            </div>
          </div>
        </div>
      </>
    );
  }
}

// export default function PickerPage(props) {
//   return (
//     <>
//       <Navbar pageHeader='Outfit Picker' />
//       <AppDrawer />
//       <div className="container">
//         <ArticleOptions articleType='tops' />
//         <ArticleOptions articleType='bottoms' />
//         <ArticleOptions articleType='shoes' />
//         <div className="row my-3">
//           <div className="col-12 d-flex justify-content-center">
//             <button className="btn btn-primary">Add to Outfits</button>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }
