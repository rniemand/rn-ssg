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
