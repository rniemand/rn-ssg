((app) => {
  const _config = app.config.logging;

  class AppLogger {
    logFetch = (url) => {
      if(!this._canLog() || !_config.logFetch) return;
      console.log(`Running fetch: ${app.config.generated.baseUrl}${url}`);
    }

    _canLog = () => {
      if(!_config.enabled) return false;
      return true;
    };
  }

  app.logger = new AppLogger();
})(RnSSG);
