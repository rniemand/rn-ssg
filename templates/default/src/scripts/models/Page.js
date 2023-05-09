((app) => {
  class Page {
    constructor(json) {
      this.id = json.id;
      this.layout = json?.layout || 'none';
      this.order = json?.order || 99;
      this.path = json.path;
      this.title = json.title;

      this.slug = json.title.toLowerCase()
        .replaceAll(' ', '-')
        .replace(/[^\w-]/gi, "");
    }

    formatString = (template) => template
      .replace('{id}', this.id)
      .replace('{title}', encodeURI(this.slug));
  }

  app.models.Page = Page;
})(RnSSG);
