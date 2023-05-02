using McMaster.Extensions.CommandLineUtils;

namespace RnSSG.Commands;

[Command("config", "c", Description = "Provides configuration related commands.")]
[Subcommand(
  typeof(GenerateConfigurationCommand)
)]
class ConfigRootCommand
{
}
