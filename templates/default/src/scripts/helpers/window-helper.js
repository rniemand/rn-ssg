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

    getSelectedUrlCategory = () => {
      if (!app.config.getCategoryRegex.test(this.getUrlHash())) return '';
      const match = app.config.getCategoryRegex.exec(this.getUrlHash());
      const matchValue = match[app.config.getCategoryIndex || 0] || '';
      return decodeURI(matchValue);
    };

    setCustomPageUrl = (url) => {
      _window.location.hash = url;
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
