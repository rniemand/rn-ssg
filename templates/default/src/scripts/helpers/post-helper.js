((app) => {
  const _logger = app.logger;

  class PostHelper {
    constructor(){
      this.postIndexLoaded = false;
      this.postsIndexUrl = '/_rnssg/posts.json';
    }

    loadPostsIndex = () => {
      return new Promise((resolve, reject) => {
        _logger.logFetch(this.postsIndexUrl);
        this.postIndexLoaded = false;

        fetch(this.postsIndexUrl).then((response) => {
          if (response.status === 404) {
            _logger.warning(`Failed to fetch URL: ${this.postsIndexUrl}`);
            reject(response);
            return;
          }
          
          response.json().then((json) => {
            _logger.info(`Loaded ${response.url}`);
            this.postIndexLoaded = true;
            resolve(json);
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
  }

  app.helpers.PostHelper = PostHelper;
})(RnSSG);
