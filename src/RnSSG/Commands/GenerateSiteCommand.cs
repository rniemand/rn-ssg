using McMaster.Extensions.CommandLineUtils;

namespace RnSSG.Commands;

[Command("generate-site", "g", Description = "Generates HTML using the provided arguments.")]
class GenerateSiteCommand
{
  [Option("--source-dir | -s", CommandOptionType.SingleOrNoValue, Description = "Source directory containing your markdown files")]
  public string StreamName { get; set; } = string.Empty;

  public async Task<int> OnExecuteAsync(CommandLineApplication cla)
  {
    Console.WriteLine("You found me!");

    return 0;
  }
}
