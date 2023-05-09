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
      this.categories = postJson.categories;
      this.slug = postJson.title.toLowerCase()
        .replaceAll(' ', '-')
        .replace(/[^\w-]/gi, "");
    }

    formatString = (template) => template
      .replace('{id}', this.id)
      .replace('{year}', this.postYear)
      .replace('{month}', this.postMonth)
      .replace('{title}', encodeURI(this.slug));
  }

  app.models.Post = Post;
})(RnSSG);
