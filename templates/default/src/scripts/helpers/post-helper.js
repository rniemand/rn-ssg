((app, _showdown) => {
  const _logger = app.logger;
  class PostHelper {
    constructor() {
      this.postIndexLoaded = false;
      this.loadingPost = false;
      this.postsIndexUrl = '/_rnssg/posts.json';
      this.postsIndex = [];
      this.allPosts = [];
      this._postLookup = {};
      this.currentPostHtml = null;
      this.selectedPost = null;
      this.postMetadata = null;
      this.selectedPostToc = [];
      this.nextPost = null;
      this.prevPost = null;
    };

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

            if (app.helpers._windowHelper.isPostUrl()) {
              this._renderPost(app.helpers._windowHelper.getUrlPostId());
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

    clearSelectedPost = (skipRender) => {
      this.currentPostHtml = null;
      this.selectedPost = null;
      this.postMetadata = null;
      this.loadingPost = false;
      this.selectedPostToc = [];
      this.nextPost = null;
      this.prevPost = null;
      app.helpers._windowHelper.clearUrlHash();
      app.helpers._html.setPageTitle('Home');

      if ((skipRender || false) === true) return;
      app.instance.render('PostHelper.clearSelectedPost()');
    };

    loadSelectedPost = (post) => {
      this.loadingPost = true;
      this.selectedPost = post;
      this.nextPost = null;
      this.prevPost = null;
      app.helpers._windowHelper.setActivePostUrl(post);
      app.instance.render('PostHelper.loadSelectedPost()');

      // set prev/next post
      const curPostIndex = this.allPosts.indexOf(post);
      this.prevPost = curPostIndex === 0 ? null : this.allPosts[curPostIndex - 1];
      this.nextPost = curPostIndex + 1 >= this.allPosts.length ? null : this.allPosts[curPostIndex + 1];

      fetch(post.path).then(
        (response) => {
          response.text().then(
            (markdown) => {
              const generatedHtml = app.helpers._mdHelper.makeHtml(markdown);
              this.loadingPost = false;
              this.currentPostHtml = generatedHtml;
              this.postMetadata = app.helpers._mdHelper.getMetadata();
              this.selectedPostToc = this._generatePostToc(markdown);
              app.helpers._html.setPageTitle(post.title);
              app.instance.render('PostHelper.loadSelectedPost()');
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

    _processPostsIndex = (posts) => {
      this.postIndexLoaded = true;
      this.postsIndex = [];
      this.allPosts = [];
      this._postLookup = {};

      // Map and sort post entries
      const mappedPosts = posts.map(x => new app.models.Post(x));
      mappedPosts.sort((a, b) => {
        // (-) => a,b | (+) => b,a | (0) => same
        if (a.date == b.date) return 0;
        if (a.date < b.date) return -1;
        return 1;
      });

      // Generate post year object
      const postYearAggr = {};
      const allPosts = [];
      for (const post of mappedPosts) {
        if (postYearAggr[post.postYear] === void 0) postYearAggr[post.postYear] = {};
        if (postYearAggr[post.postYear][post.postMonth] === void 0) postYearAggr[post.postYear][post.postMonth] = [];
        postYearAggr[post.postYear][post.postMonth].push(post);
        allPosts.push(post);
        this._postLookup[post.id] = post;
      }

      this.postsIndex = postYearAggr;
      this.allPosts = allPosts.reverse();
    };

    _renderPost = (postId) => {
      if (this._postLookup[postId] === void 0) {
        // todo: complete this...
        throw new Error(`Need to complete this!`);
      }

      this.loadSelectedPost(this._postLookup[postId]);
    };

    _generatePostToc = (markdown) => {
      const toc = [];
      const knownSlugs = [];
      const titles = markdown.split("\n").filter((x) => x.indexOf("#") === 0);

      for (const title of titles) {
        const cleanTitle = title.replace(/#{1,}/, "").trim();
        let slug = cleanTitle.toLowerCase().replace(/[^\w]/gi, "");

        if (knownSlugs.indexOf(slug) > -1) {
          slug = slug + "-" + knownSlugs.filter((x) => x.indexOf(slug) === 0).length;
        }
        knownSlugs.push(slug);

        toc.push({
          title: cleanTitle,
          level: title.split(" ")[0].length,
          slug: slug,
        });
      }

      return toc;
    };
  }

  app.helpers.PostHelper = PostHelper;
})(RnSSG, showdown);
