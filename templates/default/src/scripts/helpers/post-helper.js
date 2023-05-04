((app) => {
  const _logger = app.logger;

  class PostHelper {
    constructor(){
      this.postIndexLoaded = false;
      this.postsIndexUrl = '/_rnssg/posts.json';
      this.postsIndex = [];
      this.allPosts = [];
      this.currentPost = null;
    }

    loadPostsIndex = () => {
      return new Promise((resolve, reject) => {
        _logger.logFetch(this.postsIndexUrl);
        this.postIndexLoaded = false;
        this.postsIndex = [];
        this.allPosts = [];

        fetch(this.postsIndexUrl).then((response) => {
          if (response.status === 404) {
            _logger.warning(`Failed to fetch URL: ${this.postsIndexUrl}`);
            reject(response);
            return;
          }
          
          response.json().then((json) => {
            _logger.info(`Loaded ${response.url}`);
            this._processPostsIndex(json);
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

    renderPost = (postId) => {
      console.log('renderPost', postId)
    };

    _processPostsIndex = (json) => {
      this.postIndexLoaded = true;
      this.postsIndex = [];
      this.allPosts = [];

      // Map and sort post entries
      const mappedPosts = json.posts.map(x => new app.models.Post(x));
      mappedPosts.sort((a, b) => {
				// (-) => a,b | (+) => b,a | (0) => same
        if(a.date == b.date) return 0;
        if(a.date < b.date) return -1;
        return 1;
			});

      // Generate post year object
      const postYearAggr = {};
      const allPosts = [];
      for(const post of mappedPosts) {
        post._id = post._date.replace(/[^\d]/gi, '');
        if(postYearAggr[post.postYear] === void 0) postYearAggr[post.postYear] = {};
        if(postYearAggr[post.postYear][post.postMonth] === void 0) postYearAggr[post.postYear][post.postMonth] = [];
        postYearAggr[post.postYear][post.postMonth].push(post);
        allPosts.push(post);
      }

      this.postsIndex = postYearAggr;
      this.allPosts = allPosts.reverse();
    };
  }

  app.helpers.PostHelper = PostHelper;
})(RnSSG);
