((app) => {
  class ViewPost extends React.Component {
    constructor(props) {
      super(props);
    }

    render() {
      const postHelper = this.props.postHelper;
      const postHtml = postHelper.currentPostHtml;

      const postListHandler = () => {
        postHelper.clearSelectedPost();
        app.helpers._urlHelper.setPostsUrl();
      }

      if (!postHtml) {
        return (<div>
          <h1>Error rendering post</h1>
          <p>Something went wrong with rendering this post entry.</p>
        </div>)
      }

      return (<div className="post">
        {postHelper.prevPost && <button onClick={() => postHelper.loadSelectedPost(postHelper.prevPost)}>&lt; Prev Post</button>}
        &nbsp;
        <button onClick={postListHandler}>Post list</button>
        &nbsp;
        {postHelper.nextPost && <button onClick={() => postHelper.loadSelectedPost(postHelper.nextPost)}>Next Post &gt;</button>}
        <app.components.PostHeader post={postHelper.selectedPost} metadata={postHelper.postMetadata} />
        <app.components.PostToc toc={postHelper.selectedPostToc} metadata={postHelper.postMetadata} />
        <div className="content" dangerouslySetInnerHTML={{ __html: postHtml }}></div>
      </div>);
    }
  }

  app.components.ViewPost = ViewPost;
})(RnSSG);
