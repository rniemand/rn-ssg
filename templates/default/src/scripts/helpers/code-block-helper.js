((app, _document, _Prism) => {
  _Prism.manual = true;

  // https://stackoverflow.com/questions/59508413/static-html-generation-with-prismjs-how-to-enable-line-numbers
  var NEW_LINE_EXP = /\n(?!$)/g;
  var lineNumbersWrapper;
  _Prism.hooks.add('after-tokenize', function (env) {
    var match = env.code.match(NEW_LINE_EXP);
    var linesNum = match ? match.length + 1 : 1;
    var lines = new Array(linesNum + 1).join('<span></span>');
    lineNumbersWrapper = `<span aria-hidden="true" class="line-numbers-rows">${lines}</span>`;
  });

  class CodeBlockHelper {
    runHighlight = () => {
      setTimeout(() => {
        for (const node of _document.querySelectorAll('.rnssg .post .content pre')) {
          this._processCodeBlock(node);
        }
      }, 10);
    };

    // Internal methods
    _processCodeBlock = (node) => {
      const codeNode = node.querySelector('code');
      const languages = codeNode.classList.value.split(" ").filter((x) => x.indexOf("language-") > -1);
      if (languages.length === 0) return;

      const shorthand = languages[0].split("-")[1];
      if (shorthand.toLowerCase() === 'text') return;

      const prismLanguage = this._getPrismLanguage(shorthand);
      if (!prismLanguage) return;

      codeNode.innerHTML = Prism.highlight(codeNode.innerHTML, prismLanguage, shorthand) + lineNumbersWrapper;
      node.classList.add('line-numbers');
      node.classList.add(languages[0]);
    };

    _getPrismLanguage = (shorthand) => {
      switch (shorthand.toLowerCase().trim()) {
        case "js": return Prism.languages.javascript;
        case "ini": return Prism.languages.ini;
        case "bash": return Prism.languages.bash;
        case "shell": return Prism.languages.shellsession;
        case "xml": return Prism.languages.markup;
        case "html": return Prism.languages.markup;
        case "yaml": return Prism.languages.yaml;
        case "cs": return Prism.languages.csharp;
        case "json": return Prism.languages.json;
        case "ts": return Prism.languages.typescript;
        case "sql": return Prism.languages.sql;
        case "dockerfile": return Prism.languages.dockerfile;
        case "powershell": return Prism.languages.powershell;
        case "conf": return Prism.languages.editorconfig;
        case "php": return null;
        case "cpp": return null;
        default: throw new Error(`unsupported language: ${shorthand}`);
      }
    };
  }

  app.helpers._cbHelper = new CodeBlockHelper();
})(RnSSG, document, Prism);
