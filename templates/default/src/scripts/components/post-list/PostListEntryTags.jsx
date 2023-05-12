((app) => {
  class PostListEntryTags extends React.Component {
    constructor(props) {
      super(props);
    }

    render() {
      const tags = this.props.tags;
      if (!tags || tags.length === 0) return null;

      const tagClickHandler = (tag) => {
        app.helpers._urlHelper.setSelectedTagUrl(tag);
      };

      return (<div>
        {tags.map(tag => {
          return (<semanticUIReact.Label key={tag} className='tag' onClick={() => tagClickHandler(tag)} as='a'>
            <semanticUIReact.Icon name='tag' /> {tag}
          </semanticUIReact.Label>);
        })}
      </div>);
    }
  }

  app.components.PostListEntryTags = PostListEntryTags;
})(RnSSG);