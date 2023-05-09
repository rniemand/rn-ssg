((app) => {
  const _logger = app.logger;

  class PageHelper {
    constructor() {
      this.pagesIndexUrl = '/_rnssg/pages.json';
      this.allPages = [];
      this.selectedPage = null;
      this.pageLoading = false;
      this.currentPageHtml = null;
      this.currentPageMetadata = null;
      this.pageLookup = {};
      this.special = {};
    }

    loadPagesIndex = () => {
      return new Promise((resolve, reject) => {
        _logger.logFetch(this.pagesIndexUrl);

        fetch(this.pagesIndexUrl).then((response) => {
          if (response.status === 404) {
            _logger.warning(`Failed to fetch URL: ${this.postsIndexUrl}`);
            reject(response);
            return;
          }

          response.json().then((json) => {
            _logger.info(`Loaded ${response.url}`);
            this._processPages(json);

            if (app.helpers._windowHelper.isPageUrl()) {
              this._renderPage(app.helpers._windowHelper.getUrlPageId());
            }

            resolve();
          }, error => {
            _logger.error(error);
            reject(error);
          });
        }, error => {
          _logger.error(error);
          reject(error);
        });
      });
    };

    loadSelectedPage = (page) => {
      this.pageLoading = true;
      app.helpers._urlHelper.setActivePageUrl(page);
      this.selectedPage = page;
      this.currentPageHtml = null;
      this.currentPageMetadata = null;
      app.logger.info(`Loading page: ${page.path}`);
      app.state.layout = 'page';

      fetch(page.path).then(
        (response) => {
          response.text().then(
            (markdown) => {
              const generatedHtml = app.helpers._mdHelper.makeHtml(markdown);
              this.pageLoading = false;
              this.currentPageHtml = generatedHtml;
              this.currentPageMetadata = app.helpers._mdHelper.getMetadata();

              if ((this.currentPageMetadata.layout?.length ?? 0) > 0) {
                app.state.layout = this.currentPageMetadata.layout;
                app.logger.debug(`Setting page layout to: ${app.state.layout}`);
              }

              app.helpers._html.setPageTitle(page.title);
              app.instance.render('PageHelper.loadSelectedPage()');
              app.helpers._cbHelper.runHighlight();
            },
            (error) => {
              //todo: complete this
              console.error(error);
            }
          );
        },
        (error) => {
          // todo: complete this
          console.error(error);
        }
      );
    };

    clearSelectedPage = (skipRender) => {
      this.selectedPage = null;
      this.pageLoading = false;
      this.currentPageHtml = null;
      this.currentPageMetadata = null;
      app.helpers._windowHelper.clearUrlHash();
      if ((skipRender || false) === true) return;
      app.instance.render('PageHelper.clearSelectedPage()');
    };

    _processPages = (pages) => {
      const processed = [];
      this.special = {};

      for (const pageJson of pages) {
        const page = new app.models.Page(pageJson);
        processed.push(page);
        this.pageLookup[page.id] = page;

        if (page.layout !== 'page') {
          this.special[page.layout] = page;
        }
      }

      processed.sort((a, b) => {
        if (a.order === b.order) return 0;
        if (a.order < b.order) return -1;
        return 1;
      });

      this.allPages = processed;
    };

    _renderPage = (pageId) => {
      const page = this.pageLookup[pageId];
      if (!page) {
        // todo: complete this...
        throw new Error(`Need to complete this!`);
      }

      this.loadSelectedPage(page);
    };
  }

  app.helpers.PageHelper = PageHelper;
})(RnSSG);
