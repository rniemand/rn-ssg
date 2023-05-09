((app, _window) => {
  class UrlHelper {
    constructor() {
      this.currentUrl = _window.location.href;
    }

    setActivePageUrl = (page) => {
      if (!page instanceof app.models.Page) throw new Error('page needs to be an instance of Page()');
      this._setUrl({ hash: page.formatString(app.config.pageUrlTemplate) });
    };

    setActivePostUrl = (post) => {
      if (!post instanceof app.models.Post) throw new Error('post needs to be an instance of Post()');
      this._setUrl({ hash: post.formatString(app.config.postUrlTemplate) });
    };

    setSelectedTagUrl = (tag, page) => {
      if (!page) page = app.globals.pageHelper.special.tags;
      const pageHash = page.formatString(app.config.pageTagUrlTemplate)
        .replace('{tag}', encodeURI(tag));

      this._setUrl({ hash: pageHash });
      app.state.layout = 'tags';
      app.instance.render('UrlHelper.setSelectedTagUrl()');
    };

    setSelectedCategoryUrl = (category, page) => {
      if (!page) page = app.globals.pageHelper.special.tags;
      const pageHash = page.formatString(app.config.pageTagUrlTemplate)
        .replace('{tag}', encodeURI(category));

      this._setUrl({ hash: pageHash });
      app.instance.render('UrlHelper.setSelectedCategoryUrl()');
    };

    setPostsUrl = () => {
      const page = app.globals.pageHelper.special.posts;
      if (!page) throw new Error('Unable to resolve your posts page!');
      app.instance.pageHelper.loadSelectedPage(page);
    };

    generateSpecialPageUrl = (key) => {
      let page = app.globals.pageHelper.special[key];
      if (!page) throw new Error(`Unable to find special page: ${key}`);
      let template = app.config.pageUrlTemplate;
      if (key === 'post') template = app.config.postUrlTemplate;
      if (key === 'tags') template = app.config.pageTagUrlTemplate;
      return page.formatString(template);
    };

    onHashChange = () => {
      if (this.currentUrl == _window.location.href) return;
      console.log('hash changed', _window.location.href);
    };

    _setUrl = (options) => {
      const url = new URL(_window.location);
      if (options.hash) url.hash = options.hash;
      this.currentUrl = url.href;
      _window.history.pushState({}, "", url);
    }
  }

  app.helpers._urlHelper = new UrlHelper();
  _window.addEventListener('hashchange', app.helpers._urlHelper.onHashChange);
})(RnSSG, window);
