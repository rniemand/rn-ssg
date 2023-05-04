((app) => {
  const _config = app.config.logging;
  const Severity = app.enums.LogSeverity;

  class AppLogger {
    logWarning = (message) => {

    };

    logFetch = (url) => {
      if(!this._canLog(Severity.Info) || !_config.logFetch) return;
      console.log(`Running fetch: ${app.config.generated.baseUrl}${url}`);
    };

    _canLog = (severity) => {
      if(!_config.enabled) return false;
      if(severity < _config.minSeverity) return false;
      return true;
    };
  }

  app.logger = new AppLogger();
})(RnSSG);
