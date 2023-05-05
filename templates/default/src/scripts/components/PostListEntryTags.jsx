((app) => {
  class PostListEntryTags extends React.Component {
    constructor(props) {
      super(props);
    }

    render() {
      const tags = this.props.tags;
      if (!tags || tags.length === 0) return null;

      return (<div>
        {tags.map(tag => {
          return (<semanticUIReact.Label key={tag}>
            <semanticUIReact.Icon name='tag' /> {tag}
          </semanticUIReact.Label>);
        })}
      </div>);
    }
  }

  app.components.PostListEntryTags = PostListEntryTags;
})(RnSSG);