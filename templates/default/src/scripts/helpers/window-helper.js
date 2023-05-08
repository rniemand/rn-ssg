((app, _window) => {
  class WindowHelper {
    isPostUrl = () => app.config.postUrlRegex.test(this.getUrlHash());

    isPageUrl = () => app.config.pageUrlRegex.test(this.getUrlHash());

    getUrlPostId = () => {
      const match = app.config.postUrlRegex.exec(this.getUrlHash());
      return match[1];
    };

    getUrlPageId = () => {
      const match = app.config.pageUrlRegex.exec(this.getUrlHash());
      return match[1];
    };

    getSelectedUrlTag = () => {
      if (!app.config.getTagRegex.test(this.getUrlHash())) return '';
      const match = app.config.getTagRegex.exec(this.getUrlHash());
      const matchValue = match[app.config.getTagIndex || 0] || '';
      return decodeURI(matchValue);
    };

    setCustomPageUrl = (url) => {
      _window.location.hash = url;
    };

    setActivePostUrl = (post) => {
      _window.location.hash = app.config.postUrlTemplate
        .replace('{id}', post.id)
        .replace('{year}', post.postYear)
        .replace('{month}', post.postMonth)
        .replace('{title}', encodeURI(post.slug));
    };

    setActivePageUrl = (page) => {
      _window.location.hash = app.config.pageUrlTemplate
        .replace('{id}', page.id)
        .replace('{title}', encodeURI(page.slug));
    };

    setSelectedTagUrl = (page, tag) => {
      _window.location.hash = app.config.pageTagUrlTemplate
        .replace('{id}', page.id)
        .replace('{title}', encodeURI(page.slug))
        .replace('{tag}', encodeURI(tag));
    };

    setPostsUrl = () => {
      _window.location.hash = '/posts';
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
