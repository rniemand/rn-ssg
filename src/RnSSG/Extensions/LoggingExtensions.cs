using Microsoft.Extensions.Logging;

namespace RnSSG.Extensions;

public static class LoggingExtensions
{
  public static void LogUnhandledException(this ILogger logger, Exception ex)
  {
#if DEBUG
    logger.LogError(ex, "UNHANDLED EXCEPTION: {exName}: {exMessage}\n{exStack}\n",
      ex.GetType().Name,
      ex.Message,
      ex.StackTrace);
#else
		logger.LogError(ex, "UNHANDLED EXCEPTION: {exName}\n{exStack}\n",
			ex.GetType().Name,
			ex.StackTrace);
#endif
  }
}
