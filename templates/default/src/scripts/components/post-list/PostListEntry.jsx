((app) => {
  class PostListEntry extends React.Component {
    constructor(props) {
      super(props);
    }

    render() {
      const post = this.props.post;
      const dateFormatted = post.date.toLocaleDateString('en-us', { weekday: "long", year: "numeric", month: "short", day: "numeric" });
      const imageUrl = post.image || '';
      const hasImage = imageUrl.length > 0;

      return (<semanticUIReact.Item>
        {hasImage && <semanticUIReact.Item.Image onClick={() => this.props.onPostSelected(post)} size='small' src={post.image} rounded bordered />}
        <semanticUIReact.Item.Content>
          <semanticUIReact.Item.Header as='a' onClick={() => this.props.onPostSelected(post)}>
            {post.title}
          </semanticUIReact.Item.Header>
          <semanticUIReact.Item.Meta>
            <span className='date'>{dateFormatted}</span>
            by
            <span className="author">{post.author}</span>
          </semanticUIReact.Item.Meta>
          <semanticUIReact.Item.Extra>
            <app.components.PostListEntryTags tags={post.tags} />
          </semanticUIReact.Item.Extra>
        </semanticUIReact.Item.Content>
      </semanticUIReact.Item>);
    }
  }

  app.components.PostListEntry = PostListEntry;
})(RnSSG);
