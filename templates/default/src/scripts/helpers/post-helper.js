((app) => {
  const _logger = app.logger;

  class PostHelper {
    constructor(){
      this.postIndexLoaded = false;
      this.loadingPost = false;
      this.postsIndexUrl = '/_rnssg/posts.json';
      this.postsIndex = [];
      this.allPosts = [];
      this.currentPostHtml = null;
      this.selectedPost = null;
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

    clearSelectedPost = () => {
      this.currentPostHtml = null;
      this.selectedPost = null;
      this.loadingPost = false;
      app.instance.render();
    };

    loadSelectedPost = (post) => {
      this.loadingPost = true;
      this.selectedPost = post;
      app.instance.render();

      fetch(post.path).then(
        (response) => {
          response.text().then(
            (markdown) => {
              const generatedHtml = converter.makeHtml(markdown);
              const metadata = converter.getMetadata();

              //document.getElementById("content").innerHTML = generatedHtml;
              //document.getElementById("title").innerHTML = metadata.title;
              // document.getElementById("date").innerHTML = metadata.date;
              // renderTags(metadata);

              // const toc = [];
              // const knownSlugs = [];
              // const titles = markdown
              //   .split("\n")
              //   .filter((x) => x.indexOf("#") === 0);

              // for (const title of titles) {
              //   const cleanTitle = title.replace(/#{1,}/, "").trim();
              //   let slug = cleanTitle.toLowerCase().replace(/[^\w]/gi, "");
              //   if (knownSlugs.indexOf(slug) > -1) {
              //     slug =
              //       slug +
              //       "-" +
              //       knownSlugs.filter((x) => x.indexOf(slug) === 0).length;
              //   }
              //   knownSlugs.push(slug);

              //   toc.push({
              //     title: cleanTitle,
              //     level: title.split(" ")[0].length,
              //     slug: slug,
              //   });
              // }

              // renderToc(toc);

              // for (const cb of document.querySelectorAll(
              //   "#content pre code"
              // )) {
              //   processCodeBlock(cb);
              // }


              this.loadingPost = false;
              this.currentPostHtml = generatedHtml;
              app.instance.render();
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
