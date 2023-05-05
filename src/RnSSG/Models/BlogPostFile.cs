using RnSSG.Models.Metadata;

namespace RnSSG.Models;

class BlogPostFile
{
  public string FilePath { get; }
  public string RelativePath { get; }
  public string FileName { get; }
  public BlogPostMetadata Metadata { get; set; }

  public BlogPostFile(string filePath, string relativePath, string fileName, BlogPostMetadata metadata)
  {
    FilePath = filePath;
    RelativePath = relativePath;
    FileName = fileName;
    Metadata = metadata;
  }
}
