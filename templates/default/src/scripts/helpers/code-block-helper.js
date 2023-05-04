((app, _document, _Prism) => {
  _Prism.manual = true;

  class CodeBlockHelper {
    runHighlight = () => {
      setTimeout(() => {
        for(const node of _document.querySelectorAll('.rnssg .post .content pre code')) {
          this._processCodeBlock(node);
        }
      }, 10);
    };

    // Internal methods
    _processCodeBlock = (node) => {
      const languages = node.classList.value.split(" ").filter((x) => x.indexOf("language-") > -1);
      if (languages.length === 0) return;
      
      const shorthand = languages[0].split("-")[1];
      if(shorthand.toLowerCase() === 'text') return;

      const prismLanguage = this._getPrismLanguage(shorthand);
      node.innerHTML = Prism.highlight(node.innerHTML, prismLanguage, shorthand);
    };

    _getPrismLanguage = (shorthand) => {
      switch (shorthand.toLowerCase().trim()) {
        case "js": return Prism.languages.javascript;
        case "ini": return Prism.languages.ini;
        case "bash": return Prism.languages.bash;
        case "shell": return Prism.languages.shellsession;
        case "xml": return Prism.languages.markup;
        case "html": return Prism.languages.markup;
        default: throw new Error(`unsupported language: ${shorthand}`);
      }
    };
  }

  app.helpers._cbHelper = new CodeBlockHelper();
})(RnSSG, document, Prism);
