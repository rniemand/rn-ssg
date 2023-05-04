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

        fetch(this.postsIndexUrl).then((response) => {
          if (response.status === 404) {
            reject(response);
            return;
          }

          response.json().then(resolve, reject);
        }, reject);
      });
    };
  }

  app.helpers.PostHelper = PostHelper;
})(RnSSG);
