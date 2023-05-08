((app) => {
  class PostList extends React.Component {
    constructor(props) {
      super(props);
    }

    render() {
      const posts = this.props.posts || [];
      if (posts.length === 0) return null;

      return (<semanticUIReact.Item.Group divided>
        {posts.map(post => {
          return (<app.components.PostListEntry key={post.id} post={post} onPostSelected={() => this.props.onPostSelected(post)} />);
        })}
      </semanticUIReact.Item.Group>);
    }
  }

  app.components.PostList = PostList;
})(RnSSG);