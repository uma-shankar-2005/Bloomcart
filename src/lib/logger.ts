type LogLevel = 'info' | 'warn' | 'error';

interface LogEntry {
  level: LogLevel;
  message: string;
  context?: string;
  timestamp: string;
  error?: unknown;
}

interface FormattedError {
  name: string;
  message: string;
  stack?: string;
}

const formatError = (error: unknown): FormattedError => {
  if (error instanceof Error) {
    return {
      name: error.name,
      message: error.message,
      stack: error.stack,
    };
  }
  return {
    name: 'Unknown Error',
    message: String(error),
  };
};

const formatLogMessage = (entry: LogEntry): string => {
  const timestamp = entry.timestamp;
  const level = entry.level.toUpperCase();
  const context = entry.context ? `[${entry.context}]` : '';
  
  return `[${timestamp}] ${level} ${context}: ${entry.message}`;
};

interface TypedConsoleMethod {
  (message: string, ...args: unknown[]): void;
}

type ConsoleMethodMap = {
  [K in LogLevel]: TypedConsoleMethod;
};

class SafeLogger {
  private static instance: SafeLogger;
  private readonly methods: ConsoleMethodMap;

  private constructor() {
    const boundLog = Function.prototype.bind.call(console.log, console);
    const boundWarn = Function.prototype.bind.call(console.warn, console);
    const boundError = Function.prototype.bind.call(console.error, console);

    this.methods = {
      info: (message: string, ...args: unknown[]): void => {
        boundLog(`[INFO] ${message}`, ...args);
      },
      warn: (message: string, ...args: unknown[]): void => {
        boundWarn(`[WARN] ${message}`, ...args);
      },
      error: (message: string, ...args: unknown[]): void => {
        boundError(`[ERROR] ${message}`, ...args);
      }
    };

    // Freeze the methods to prevent modification
    Object.freeze(this.methods);
  }

  private static createInstance(): SafeLogger {
    return new SafeLogger();
  }

  public static getInstance(): SafeLogger {
    if (!SafeLogger.instance) {
      SafeLogger.instance = SafeLogger.createInstance();
    }
    return SafeLogger.instance;
  }

  public getLogger(level: LogLevel): TypedConsoleMethod {
    return (message: string, ...args: unknown[]): void => {
      try {
        // Using type assertion here because we know the methods exist
        const method = this.methods[level] as TypedConsoleMethod;
        method(message, ...args);
      } catch (error) {
        // Fallback with explicit binding
        const fallback = Function.prototype.bind.call(
          console.log,
          console,
          '[LOGGER FALLBACK]',
          message
        );
        fallback(error, ...args);
      }
    };
  }
}

function createSafeLogger(level: LogLevel): TypedConsoleMethod {
  return SafeLogger.getInstance().getLogger(level);
}

const logToConsole = (
  level: LogLevel,
  formattedMessage: string,
  error?: unknown
): void => {
  const safeLog = createSafeLogger(level);

  if (error) {
    const formattedError = formatError(error);
    const errorDetails: readonly string[] = [
      formattedMessage,
      'Error Details:',
      `  Name: ${formattedError.name}`,
      `  Message: ${formattedError.message}`,
      ...(formattedError.stack ? [`  Stack: ${formattedError.stack}`] : []),
    ] as const;
    
    errorDetails.forEach((message: string): void => {
      safeLog(message);
    });
  } else {
    safeLog(formattedMessage);
  }
};

const log = (level: LogLevel, message: string, context?: string, error?: unknown): void => {
  const entry: LogEntry = {
    level,
    message,
    context,
    timestamp: new Date().toISOString(),
    error,
  };

  if (process.env.NODE_ENV === 'development') {
    const formattedMessage = formatLogMessage(entry);
    logToConsole(level, formattedMessage, error);
  }

  // Production logging possibilities:
  // 1. Send to a logging service (e.g., Sentry, LogRocket)
  // 2. Write to a log file
  // 3. Send to a monitoring service
  // 4. Store in a database
};

export const logger = {
  info: (message: string, context?: string): void => {
    log('info', message, context);
  },
  warn: (message: string, context?: string, error?: unknown): void => {
    log('warn', message, context, error);
  },
  error: (message: string, context?: string, error?: unknown): void => {
    log('error', message, context, error);
  },
} as const;