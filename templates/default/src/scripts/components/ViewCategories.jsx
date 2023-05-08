((app) => {
  class ViewCategories extends React.Component {
    constructor(props) {
      super(props);
    }

    render() {
      const postHelper = this.props.postHelper;

      return (<div className="post-categories">
        <h2>Categories</h2>
        {postHelper.categoryNames.map(cat => {
          return (<semanticUIReact.Label key={cat} className="category">
            <semanticUIReact.Icon name='folder open' />
            {cat}
            <semanticUIReact.Label.Detail>
              {postHelper.categories[cat].postCount}
            </semanticUIReact.Label.Detail>
          </semanticUIReact.Label>);
        })}
      </div>);
    }
  }

  app.components.ViewCategories = ViewCategories;
})(RnSSG);
