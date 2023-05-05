((app) => {
  class PageNav extends React.Component {
    constructor(props) {
      super(props);
    }

    render() {
      const pageHelper = this.props.pageHelper;
      const pages = pageHelper.allPages;
      if (!pages || pages.length === 0) return null;
      const activePageId = pageHelper.selectedPage?.id || 0;

      return (<semanticUIReact.Menu stackable fluid>
        {pages.map(page => {
          return (<semanticUIReact.Menu.Item key={page.slug} onClick={() => this.props.onPageSelected(page)} active={activePageId == page.id}>
            {page.title}
          </semanticUIReact.Menu.Item>);
        })}
      </semanticUIReact.Menu>);
    }
  }

  app.components.PageNav = PageNav;
})(RnSSG);
