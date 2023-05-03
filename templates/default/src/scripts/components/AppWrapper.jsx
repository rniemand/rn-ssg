((app) => {
  class AppWrapper extends React.Component {
		constructor(props) {
			super(props);
		}

		render() {
      const postHelper = this.props.postHelper;

      return (
        <div className="core-app">
          <p>This is a placeholder FOR the application!</p>
        </div>
      );
		}
	}

  app.components.AppWrapper = AppWrapper;
})(RnSSG);
