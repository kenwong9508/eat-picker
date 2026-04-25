import winston from 'winston';

const logger = winston.createLogger({
  level:
    process.env.NODE_ENV === 'production' ? 'info' : 'http',
  format: winston.format.combine(
    winston.format.timestamp({
      format: 'YYYY-MM-DDTHH:mm:ss.SSSZ',
    }),
    winston.format.errors({ stack: true }),
    winston.format.json()
  ),
  transports: [
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.colorize({ all: true }),
        winston.format.printf(
          ({
            timestamp,
            level,
            message,
            module,
            stack,
          }) => {
            const mod = module ? `[${module}]` : '';
            let fileLine = '';
            if (
              stack &&
              typeof stack === 'string' &&
              stack.includes('\n')
            ) {
              const lines = stack.split('\n');
              const match =
                lines[1]
                  ?.match(/at (?:.*\s)?\((.*):(\d+):\d+\)/)
                  ?.slice(1)
                  ?.join(':') ||
                lines[1]
                  ?.match(/(.*):(\d+):\d+/)
                  ?.slice(1)
                  ?.join(':');
              if (match) fileLine = match;
            }
            const dash = mod || fileLine ? ' - ' : '';
            return `${timestamp} ${level.toLowerCase()} ${mod} ${fileLine}${dash}${message}`;
          }
        )
      ),
    }),
  ],
});

export default logger;
