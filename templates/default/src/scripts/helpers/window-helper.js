((app, _window) => {
  class WindowHelper {
    isPostUrl = () => {
      return app.config.postUrlRegex.test(this._getUrlHash());
    };

    getUrlPostId = () => {
      const match = app.config.postUrlRegex.exec(this._getUrlHash());
      return match[1];
    };

    setActivePostUrl = (post) => {
      const postUrlSegment = app.config.postUrlTemplate
        .replace('{id}', post.id)
        .replace('{year}', post.postYear)
        .replace('{month}', post.postMonth)
        .replace('{title}', encodeURI(post.title));

      _window.location.hash = postUrlSegment;
    };

    clearUrlHash = () => {
      _window.location.hash = '';
    };

    // Internal methods
    _getUrlHash = () => {
      let hash = _window.location.hash || '';
      if(hash.startsWith('#')) hash = hash.substring(1);
      return hash;
    };
  }

  app.helpers._windowHelper = new WindowHelper();
})(RnSSG, window);
