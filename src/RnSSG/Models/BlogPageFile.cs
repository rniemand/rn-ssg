using RnSSG.Models.Metadata;

namespace RnSSG.Models;

class BlogPageFile
{
  public string FilePath { get; }
  public string RelativePath { get; }
  public string FileName { get; }
  public BlogPageMetadata Metadata { get; }
  
  public BlogPageFile(string filePath, string relativePath, string fileName, BlogPageMetadata metadata)
  {
    FilePath = filePath;
    RelativePath = relativePath;
    FileName = fileName;
    Metadata = metadata;
  }
}
