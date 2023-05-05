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

      return (<ul className="page-nav">
        {pages.map(page => {
          let classes = '';
          if (activePageId == page.id) classes += 'active';

          return (<li key={page.slug} onClick={() => this.props.onPageSelected(page)}>
            <a className={classes}>{page.title}</a>
          </li>);
        })}
      </ul>);
    }
  }

  app.components.PageNav = PageNav;
})(RnSSG);
