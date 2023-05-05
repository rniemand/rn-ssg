((app, _window) => {
  class WindowHelper {
    isPostUrl = () => {
      return app.config.postUrlRegex.test(this.getUrlHash());
    };

    isPageUrl = () => {
      return app.config.pageUrlRegex.test(this.getUrlHash());
    };

    getUrlPostId = () => {
      const match = app.config.postUrlRegex.exec(this.getUrlHash());
      return match[1];
    };

    getUrlPageId = () => {
      const match = app.config.pageUrlRegex.exec(this.getUrlHash());
      return match[1];
    };

    setActivePostUrl = (post) => {
      const postUrlSegment = app.config.postUrlTemplate
        .replace('{id}', post.id)
        .replace('{year}', post.postYear)
        .replace('{month}', post.postMonth)
        .replace('{title}', encodeURI(post.slug));

      _window.location.hash = postUrlSegment;
    };

    setActivePageUrl = (page) => {
      const pageUrlSegment = app.config.pageUrlTemplate
        .replace('{id}', page.id)
        .replace('{title}', encodeURI(page.slug));

      _window.location.hash = pageUrlSegment;
    };

    clearUrlHash = () => {
      _window.location.hash = '';
    };

    getUrlHash = () => {
      let hash = _window.location.hash || '';
      if (hash.startsWith('#')) hash = hash.substring(1);
      return hash;
    };
  }

  app.helpers._windowHelper = new WindowHelper();
})(RnSSG, window);
