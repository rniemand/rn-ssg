((app, _showdown) => {
  const converter = new _showdown.Converter();
  converter.setOption("omitExtraWLInCodeBlocks", true);
  converter.setOption("parseImgDimensions", true);
  converter.setOption("simplifiedAutoLink", true);
  converter.setOption("tables", true);
  converter.setOption("openLinksInNewWindow", true);
  converter.setOption("emoji", true);
  converter.setOption("metadata", true);
  converter.setOption("backslashEscapesHTMLTags", true);

  class MarkdownHelper {
    makeHtml = (markdown) => converter.makeHtml(markdown);

    getMetadata = () => converter.getMetadata();
  }

  app.helpers._mdHelper = new MarkdownHelper();
})(RnSSG, showdown);
