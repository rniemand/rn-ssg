using McMaster.Extensions.CommandLineUtils;

namespace RnSSG.Commands;

[Command("metadata", Description = "Generates metadata for your site.")]
class GenerateMetadataCommand
{
  public async Task<int> OnExecuteAsync()
  {
    Console.WriteLine("will need to generate site metadata");

    return 0;
  }
}
