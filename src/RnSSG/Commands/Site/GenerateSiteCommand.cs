using McMaster.Extensions.CommandLineUtils;

namespace RnSSG.Commands;

[Command("generate", "g", Description = "Generates your site using the provided configuration.")]
class GenerateSiteCommand
{
  [Option("--source-dir | -s", CommandOptionType.SingleOrNoValue, Description = "Source directory containing your markdown files")]
  public string SourceDir { get; set; } = string.Empty;

  public async Task<int> OnExecuteAsync(CommandLineApplication cla)
  {
    Console.WriteLine($"You found me! - {SourceDir}");

    return 0;
  }
}
