((app) => {
  class PageNav extends React.Component {
		constructor(props) {
			super(props);
		}

		render() {
      const pageHelper = this.props.pageHelper;
      const pages = pageHelper.allPages;
      if(!pages || pages.length === 0) return null;

      return (<div className="post">
        <ul>
          {pages.map(page => {
            return(<li key={page.slug} onClick={() => this.props.onPageSelected(page)}>
              {page.title}
            </li>);
          })}
        </ul>
      </div>);
		}
	}

  app.components.PageNav = PageNav;
})(RnSSG);
