using McMaster.Extensions.CommandLineUtils;

namespace RnSSG.Commands;

[Command("generate", "g", Description = "Generates initial configuration used by this tool.")]
class GenerateConfigurationCommand
{
  [Option("--source-dir | -s", CommandOptionType.SingleOrNoValue, Description = "Source directory containing your markdown files")]
  public string SourceDir { get; set; } = string.Empty;

  public async Task<int> OnExecuteAsync(CommandLineApplication cla)
  {
    Console.WriteLine($"Generating configuration - {SourceDir}");

    return 0;
  }
}
