((app) => {
  class AppHelper {
    constructor(renderFn) {
      if (!renderFn) throw new Error('No renderFn passed');
      if (typeof renderFn !== 'function') throw new Error('renderFn needs to be a function');

      app.helpers._html.setPageTitle('Home');
      this._renderFn = renderFn;
      this.postHelper = new app.helpers.PostHelper();
      this.pageHelper = new app.helpers.PageHelper();
      app.globals.postHelper = this.postHelper;
      app.globals.pageHelper = this.pageHelper;

      this._runInit();
    };

    render = (caller) => {
      if (!caller) throw new Error('You need to pass a caller into this function');
      app.logger.renderCall(caller);
      this._renderFn(this);
    };

    _runInit = () => {
      this.postHelper.loadPostsIndex()
        .then(this.pageHelper.loadPagesIndex)
        .then(() => this._renderFn(this));
    };
  }

  app.helpers.AppHelper = AppHelper;
})(RnSSG);
