((app) => {
  class PostListEntry extends React.Component {
    constructor(props) {
      super(props);
    }

    render() {
      const post = this.props.post;
      const dateFormatted = post.date.toLocaleDateString('en-us', { weekday: "long", year: "numeric", month: "short", day: "numeric" });

      // return (<div className="postlist-entry">
      //   <div>{entry.title}</div>
      //   <span>{dateFormatted}</span>
      //   <div>{entry.description}</div>
      //   <button onClick={() => this.props.onViewPostClick(entry)}>View Post</button>
      // </div>);

      return (<semanticUIReact.Item>
        <semanticUIReact.Item.Image onClick={() => this.props.onViewPostClick(post)} size='small' src='https://placehold.co/600x400/png' />
        <semanticUIReact.Item.Content>
          <semanticUIReact.Item.Header as='a' onClick={() => this.props.onViewPostClick(post)}>
            {post.title}
          </semanticUIReact.Item.Header>
          <semanticUIReact.Item.Meta>
            <span className='date'>{dateFormatted}</span>
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
