((app) => {
  class AppHelper {
    constructor(onInitCallback) {
      if(!onInitCallback) throw new Error('No onInitCallback passed');
      if(typeof onInitCallback !== 'function') throw new Error('onInitCallback needs to be a function');

      this._onInit = onInitCallback;
      this.postHelper = new app.helpers.PostHelper();

      this._runInit();
    }

    _runInit =() => {
      this.postHelper.loadPostsIndex()
        .then(() => this._onInit(this));
    };
  }

  app.helpers.AppHelper = AppHelper;
})(RnSSG);
