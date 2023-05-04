((app) => {
  class Post {
    constructor(postJson) {
      this._date = postJson.date;
      this.date = new Date(postJson.date);
      this.title = postJson.title;
      this.path = postJson.path;
      this.postYear = this.date.getFullYear();
      this.postMonth = this.date.getMonth() + 1;
      this.description = postJson.description;
      this.tags = postJson.tags;
      this.author = postJson.author;
      this.id = postJson.id;
    }
  }

  app.models.Post = Post;
})(RnSSG);
