((app) => {
  class PageNav extends React.Component {
    constructor(props) {
      super(props);
    }

    render() {
      const pageHelper = this.props.pageHelper;
      const postHelper = this.props.postHelper;

      const pages = pageHelper.allPages;
      if (!pages || pages.length === 0) return null;
      const activePageId = pageHelper.selectedPage?.id || 0;

      const onPageSelectedHandler = (page) => {
        postHelper.clearSelectedPost(true);
        pageHelper.loadSelectedPage(page);
      };

      return (<semanticUIReact.Container>
        <semanticUIReact.Menu stackable fluid>
          {pages.map(page => {
            return (<semanticUIReact.Menu.Item key={page.slug} onClick={() => onPageSelectedHandler(page)} active={activePageId == page.id}>
              {page.title}
            </semanticUIReact.Menu.Item>);
          })}
        </semanticUIReact.Menu>
      </semanticUIReact.Container>);
    }
  }

  app.components.PageNav = PageNav;
})(RnSSG);
