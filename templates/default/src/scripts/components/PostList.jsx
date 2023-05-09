((app) => {
  class PostList extends React.Component {
    constructor(props) {
      super(props);
    }

    render() {
      const posts = this.props.posts || [];
      if (posts.length === 0) return null;


      posts.sort((a, b) => {
        if (a.date == b.date) return 0;
        if (a.date < b.date) return -1;
        return 1;
      });

      return (<semanticUIReact.Item.Group divided className="posts-list">
        {posts.map(post => {
          return (<app.components.PostListEntry key={post.id} post={post} onPostSelected={() => this.props.onPostSelected(post)} />);
        })}
      </semanticUIReact.Item.Group>);
    }
  }

  app.components.PostList = PostList;
})(RnSSG);