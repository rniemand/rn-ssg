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
  }

  app.models.Page = Page;
})(RnSSG);
