((app) => {
  class AppHelper {
    constructor(renderFn) {
      if(!renderFn) throw new Error('No renderFn passed');
      if(typeof renderFn !== 'function') throw new Error('renderFn needs to be a function');

      this._renderFn = renderFn;
      this.postHelper = new app.helpers.PostHelper();

      this._runInit();
    };

    render = () => this._renderFn(this);

    _runInit =() => {
      this.postHelper.loadPostsIndex()
        .then(() => this._renderFn(this));
    };
  }

  app.helpers.AppHelper = AppHelper;
})(RnSSG);