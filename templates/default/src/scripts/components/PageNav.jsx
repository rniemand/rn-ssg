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

      let activePageId = pageHelper.selectedPage?.id || 0;
      if (app.state.layout === 'posts') {
        const postsPageArray = pageHelper.allPages.filter(x => x.layout === app.state.layout);
        if (postsPageArray.length > 0) activePageId = postsPageArray[0].id;
      }

      const onPageSelectedHandler = (page) => {
        if (page.layout === 'posts') {
          pageHelper.clearSelectedPage(true);
          postHelper.clearSelectedPost();
        }
        else {
          postHelper.clearSelectedPost(true);
          pageHelper.loadSelectedPage(page);
        }
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
