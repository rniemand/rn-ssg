((app) => {
  class Tags extends React.Component {
    constructor(props) {
      super(props);
    }

    render() {
      if (app.state.layout !== 'tags') return null;
      const postHelper = this.props.postHelper;

      return (<div className="post-tags">
        <h2>Tags</h2>
        {postHelper.tagNames.map(tag => {
          return (<semanticUIReact.Label key={tag} className="tag">
            <semanticUIReact.Icon name='tag' />
            {tag}
            <semanticUIReact.Label.Detail>
              {postHelper.tags[tag].postCount}
            </semanticUIReact.Label.Detail>
          </semanticUIReact.Label>);
        })}
      </div>);
    }
  }

  app.components.Tags = Tags;
})(RnSSG);
