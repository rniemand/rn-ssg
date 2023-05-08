# rn-ssg

## Quick Commands

```shell
dotnet pack
dotnet tool install --global --add-source .\bin\Debug\ RnSSG
dotnet tool uninstall --global RnSSG
```

## References

- https://github.com/dotnet/command-line-api
- https://github.com/natemcmaster/CommandLineUtils
- https://github.com/rniemand/RnCore.Logging (Documentation)[http://www.richardn.ca/RnCore.Logging/#/]
- https://github.com/NLog/NLog.Extensions.Logging
- https://www.newtonsoft.com/json
- https://github.com/showdownjs/showdown
- https://prismjs.com/
- https://prismjs.com/plugins/autoloader/
- https://www.jsdelivr.com/
- https://cdn.jsdelivr.net/npm/prismjs@1/components/
- https://cdn.jsdelivr.net/npm/prismjs@1.29.0/themes/
- 

## Development

```bash
cd docker
docker-compose up -d
cd ..
cd .\templates\default\
npm run watch
```

- Open [http://localhost:8080/](http://localhost:8080/) to view the running application.

## Commands

Placeholder for now...

- generate
  - config - generates initial site configuration
  - metadata - builds site specific metadata
  - site - scaffolds a new site using the proposed structure

## Task List

- Fix post archive styling
- Fix table of contents on active blog post
- Order page links based on metadata
- Add concept of default author
- Rewrite documenation for CLI
- Fix table styling
- Fix image rendering logic (perhaps add a modal for more information)
- Add category browser
- Add tag browser
- Add simple search to blog
- Support for commenting on posts
- Add new post scaffolder
- Detect and load prism language files automatically
- Add additional plugins for prism
- Sort out ' quotes in post titles extracted from metadata
- fix `shelll` in Installing MariaDB (MySQL) on Ubuntu
- Promote layout from metadata to pages JSON file
- 