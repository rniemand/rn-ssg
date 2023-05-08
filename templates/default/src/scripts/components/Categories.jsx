((app) => {
  class Categories extends React.Component {
    constructor(props) {
      super(props);
    }

    render() {
      if (app.state.layout !== 'categories') return null;
      const postHelper = this.props.postHelper;

      return (<div className="page">
        <ul>
          {Object.keys(postHelper.categories).map(cat => {
            return (<li key={cat}>{cat} ({postHelper.categories[cat].postCount} posts)</li>);
          })}
        </ul>
      </div>);
    }
  }

  app.components.Categories = Categories;
})(RnSSG);
