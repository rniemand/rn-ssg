((app) => {
  class ViewCategories extends React.Component {
    constructor(props) {
      super(props);
    }

    render() {
      const postHelper = this.props.postHelper;
      const pageHelper = this.props.pageHelper;
      const selectedCategory = app.helpers._windowHelper.getSelectedUrlCategory();
      const posts = selectedCategory.length == 0 ? [] : postHelper.getFilteredPosts({
        category: selectedCategory
      });

      const onCategoryClick = (cat) => {
        app.helpers._urlHelper.setSelectedCategoryUrl(cat, pageHelper.selectedPage);
      };

      const clearCategoryClick = () => {
        pageHelper.loadSelectedPage(pageHelper.selectedPage);
      };

      if (posts.length === 0) {
        return (<div className="post-categories">
          <h2>Categories</h2>
          {postHelper.categoryNames.map(cat => {
            return (<semanticUIReact.Label key={cat} className="category" onClick={() => onCategoryClick(cat)}>
              <semanticUIReact.Icon name='folder open' />
              {cat}
              <semanticUIReact.Label.Detail>
                {postHelper.categories[cat].postCount}
              </semanticUIReact.Label.Detail>
            </semanticUIReact.Label>);
          })}
        </div>);
      }

      return (<div className="post-categories">
        <div className="posts">
          <h2>Posts with Category ({selectedCategory}) <semanticUIReact.Icon name='close' color='red' onClick={clearCategoryClick} /></h2>
          <app.components.PostList posts={posts} onPostSelected={this.props.onPostSelected} />
        </div>
      </div>);
    }
  }

  app.components.ViewCategories = ViewCategories;
})(RnSSG);
