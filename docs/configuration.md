# Configuration

Your configuration file should live in the root directory of your sites content.

```json
{
  "version": "1.0.0",
  "contentDir": "./site",
  "outputDir": "./output"
}
```

## Base Configuration

| Property | Type | Default | Description |
| --- | --- | --- | --- |
| version | version | `1.0.0` | Configuration version (for future useage) |
| contentDir | path | `./site` | The directory to look in for your sites markdown files |
| outputDir | path | `./output` | Target directory to place generated HTML files / content into |