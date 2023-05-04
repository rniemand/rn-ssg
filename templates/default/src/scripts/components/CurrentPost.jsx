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
        <app.components.PostHeader post={postHelper.selectedPost} />
        <div dangerouslySetInnerHTML={{ __html: postHtml }}></div>
      </div>);
		}
	}

  app.components.CurrentPost = CurrentPost;
})(RnSSG);
