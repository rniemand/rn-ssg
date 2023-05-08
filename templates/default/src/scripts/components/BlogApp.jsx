((app) => {
  class BlogApp extends React.Component {
    constructor(props) {
      super(props);
    }

    render() {
      const postHelper = this.props.postHelper;
      const pageHelper = this.props.pageHelper;

      return (<div className="rnssg">
        <app.components.PageNav postHelper={postHelper} pageHelper={pageHelper} />
        <semanticUIReact.Container className="main">
          <app.components.BlogContent postHelper={postHelper} pageHelper={pageHelper} />
        </semanticUIReact.Container>
      </div>);
    }
  }

  app.components.BlogApp = BlogApp;
})(RnSSG);
