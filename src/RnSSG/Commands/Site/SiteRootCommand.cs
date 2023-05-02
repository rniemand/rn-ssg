using McMaster.Extensions.CommandLineUtils;

namespace RnSSG.Commands;

[Command("site", "s", Description = "Provides site related commands.")]
[Subcommand(
  typeof(GenerateSiteCommand),
  typeof(InitSiteCommand)
)]
class SiteRootCommand
{
}
