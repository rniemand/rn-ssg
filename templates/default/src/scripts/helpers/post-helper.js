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
      this.categories = {};
      this.categoryNames = [];
      this.tags = {};
      this.tagNames = [];
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
      app.state.layout = 'posts';
      app.helpers._windowHelper.setPostsUrl();

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
      app.state.layout = 'post';

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

    listPosts = (year, month) => {
      let url = '/posts';
      if (year) url += `/${year}`;
      if (month) url += `/${month}`;

      app.state.layout = 'posts';
      app.helpers._html.setPageTitle('Posts List');
      app.helpers._windowHelper.setCustomPageUrl(url);
      app.instance.render('PostHelper.listPosts()');
    };

    getFilteredPosts = (filter) => {
      const tagFilter = filter?.tag || '';
      const catFilter = filter?.category || '';
      const tags = tagFilter.length > 0 ? [tagFilter] : (filter.tags || []);
      const cats = catFilter.length > 0 ? [catFilter] : (filter.categories || []);
      const filterOnTag = tags.length > 0;
      const filterOnCat = cats.length > 0;

      return this.allPosts.filter(post => {
        if (filterOnTag) {
          if (!this._containsTags(post, tags)) return false;
        }

        if (filterOnCat) {
          if (!this._containsCategories(post, cats)) return false;
        }

        return true;
      });
    };

    _processPostsIndex = (posts) => {
      this.postIndexLoaded = true;
      this.postsIndex = [];
      this.allPosts = [];
      this._postLookup = {};
      this.categories = {};
      this.categoryNames = [];
      this.tags = {};
      this.tagNames = [];

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
      const postCategories = {};
      const postTags = {};
      for (const post of mappedPosts) {
        if (postYearAggr[post.postYear] === void 0) postYearAggr[post.postYear] = {};
        if (postYearAggr[post.postYear][post.postMonth] === void 0) postYearAggr[post.postYear][post.postMonth] = [];
        postYearAggr[post.postYear][post.postMonth].push(post);
        allPosts.push(post);
        this._postLookup[post.id] = post;

        post.categories.forEach(cat => {
          if (postCategories[cat] === void 0) postCategories[cat] = { name: cat, postCount: 0 };
          postCategories[cat].postCount += 1;
        });

        post.tags.forEach(tag => {
          if (postTags[tag] === void 0) postTags[tag] = { name: tag, postCount: 0 }
          postTags[tag].postCount += 1;
        });
      }

      this.categories = postCategories;
      this.categoryNames = Object.keys(postCategories);
      this.categoryNames.sort();

      this.tags = postTags;
      this.tagNames = Object.keys(postTags);
      this.tagNames.sort();

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

    _containsTags = (post, tags) => {
      for (let i = 0; i < tags.length; i++) {
        if (post.tags.indexOf(tags[i]) > -1) continue;
        return false;
      }

      return true;
    };

    _containsCategories = (post, categories) => {
      for (let i = 0; i < categories.length; i++) {
        if (post.categories.indexOf(categories[i]) > -1) continue;
        return false;
      }

      return true;
    };
  }

  app.helpers.PostHelper = PostHelper;
})(RnSSG, showdown);
