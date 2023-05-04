((app) => {
  class PostsList extends React.Component {
		constructor(props) {
			super(props);
		}

		render() {
      return (<div>
        <p>posts list</p>
      </div>);
		}
	}

  app.components.PostsList = PostsList;
})(RnSSG);
