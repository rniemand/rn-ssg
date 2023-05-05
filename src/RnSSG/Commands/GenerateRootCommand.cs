using McMaster.Extensions.CommandLineUtils;

namespace RnSSG.Commands;

[Command("generate", Description = "Collection of generation commands.")]
[Subcommand(
  typeof(GenerateConfigCommand),
  typeof(GenerateMetadataCommand),
  typeof(GenerateSiteCommand)
)]
class GenerateRootCommand
{
}
