using RnCore.Abstractions;

namespace RnSSG.Helpers;

interface ISiteFileHelper
{
  string ConfigFile { get; }
  Dictionary<string, string> Directories { get; }
  ISiteFileHelper AddDirectory(string name, string root, string directory);
}

class SiteFileHelper : ISiteFileHelper
{
  public string ConfigFile { get; }
  public Dictionary<string, string> Directories { get; } = new();

  private readonly IPathAbstraction _path;

  public SiteFileHelper(IPathAbstraction path, string rootDir)
  {
    _path = path;
    ConfigFile = _path.Combine(rootDir, RnSsgConstants.ConfigFileName);
    Directories["root"] = _path.Combine(rootDir, "");
    Directories["./"] = _path.Combine(rootDir, "");
  }

  public ISiteFileHelper AddDirectory(string name, string root, string directory)
  {
    Directories[name] = _path.Combine(ProcessPath(root), directory);
    return this;
  }

  public string ProcessPath(string path)
  {
    return !path.Contains("{") ? path : Directories.Aggregate(path, (current, directory) => current.Replace($"{{{directory.Key}}}", directory.Value));
  }
}
