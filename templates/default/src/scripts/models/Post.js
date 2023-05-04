((app) => {
  class Post {
    constructor(postJson) {
      this._date = postJson.date;
      this.date = new Date(postJson.date);
      this.title = postJson.title;
      this.path = postJson.path;
      this.postYear = this.date.getFullYear();
      this.postMonth = this.date.getMonth() + 1;
    }
  }

  app.models.Post = Post;
})(RnSSG);
