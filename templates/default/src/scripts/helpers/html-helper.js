((app, _document, _window) => {
  let _dataLayer = null;
  let _gtag = null;

  class HtmlHelper {
    constructor() {
      this.googleAnalyticsConfigured = false;

      if (app.config.googleAnalytics) {
        if (!app.config.googleAnalyticsID || app.config.googleAnalyticsID.length < 5) {
          app.config.googleAnalytics = false;
        }
      }
    }

    setPageTitle = (title) => {
      _document.title = `${app.config.blogName}: ${title}`;
      this._handleGoogleAnalytics();
    };

    _configureGoogleAnalytics = () => {
      if (this.googleAnalyticsConfigured) return;

      // Disable Google Analytics if we are misconfigured
      if (!app.config.googleAnalyticsID || app.config.googleAnalyticsID.length < 5) {
        app.config.googleAnalytics = false;
        this.googleAnalyticsConfigured = true;
        return;
      }

      // Initialize Google Analytics
      this.googleAnalyticsConfigured = true;
      _dataLayer = _window.dataLayer || [];
      _gtag = function () { _dataLayer.push(arguments); };
      _window.gtag = _gtag;
      _gtag("js", new Date());
    };

    _handleGoogleAnalytics = () => {
      if (!app.config.googleAnalytics) return;
      this._configureGoogleAnalytics();
      if (!_gtag) return;

      // https://www.bounteous.com/insights/2018/03/30/single-page-applications-google-analytics
      _gtag('config', app.config.googleAnalyticsID, {
        'page_title': _document.title,
        'page_path': app.helpers._windowHelper.getUrlHash()
      });
    };
  }

  app.helpers._html = new HtmlHelper();
})(RnSSG, document, window);
