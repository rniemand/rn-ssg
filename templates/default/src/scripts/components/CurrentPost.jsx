((app) => {
  class CurrentPost extends React.Component {
		constructor(props) {
			super(props);
		}

		render() {
      const postHelper = this.props.postHelper;
      const postHtml = postHelper.currentPostHtml;
      if(!postHtml) return null;

      //console.log('postHelper', postHelper.currentPost)

      return (<div className="post">
        <app.components.PostHeader post={this.props.selectedPost} />
        <div dangerouslySetInnerHTML={{ __html: postHtml }}></div>
      </div>);
		}
	}

  app.components.CurrentPost = CurrentPost;
})(RnSSG);
