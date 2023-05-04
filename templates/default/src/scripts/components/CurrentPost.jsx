((app) => {
  class CurrentPost extends React.Component {
		constructor(props) {
			super(props);
		}

		render() {
      const postHelper = this.props.postHelper;
      const postHtml = postHelper.currentPostHtml;
      if(!postHtml) return null;

      return (<div className="post">
        <button onClick={postHelper.clearSelectedPost}>Post list</button>
        <app.components.PostHeader post={postHelper.selectedPost} metadata={postHelper.postMetadata} />
        <app.components.PostToc toc={postHelper.selectedPostToc} metadata={postHelper.postMetadata} />
        <div className="content" dangerouslySetInnerHTML={{ __html: postHtml }}></div>
      </div>);
		}
	}

  app.components.CurrentPost = CurrentPost;
})(RnSSG);
