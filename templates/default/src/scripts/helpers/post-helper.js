((app) => {
  class PostHelper {
    constructor(){
      this.postIndexLoaded = false;
    }

    loadPostsIndex = () => {
      return new Promise((resolve, reject) => {
        fetch("/_rnssg/posts.json").then((response) => {
          if (response.status === 404) {
            reject(response);
          } else {
            response.json().then(resolve, reject);
          }
        }, reject);
      });
    };
  }

  app.helpers.PostHelper = PostHelper;
})(RnSSG);
