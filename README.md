# Better Console Log Plus

Better Console Log Plus is a super efficient and performant package that enhances console logging functionality by providing colors, timestamps, and additional options to improve log readability.

<p align="center">
    <img src="https://i.imgur.com/0JwtHFY.png"/>
</p>

## Installation

```shell
npm install better-console-log-plus
```

## Usage

```javascript
const logger = require('better-console-log-plus');
// OR
import * as logger from 'better-console-log-plus';

// Example logging
logger.log('This is a log message');
logger.error('This is an error message');
logger.warn('This is a warning message');
logger.info('This is an info message');
logger.debug('This is a debug message');
```

The "better-console-log-plus" package provides a `logger` object with five available functions: `log`, `error`, `warn`, `info`, and `debug`. You can call these functions to log messages to the console with different levels of importance.

### Additional Options

The package also offers additional options to improve the log output:

- **Arguments**: You can provide additional arguments to the logging functions to include extra information in the message. These arguments will be displayed after the main message.

  ```javascript
  logger.log('Message with arguments', { foo: 'bar' }, [1, 2, 3]);
  ```

  The above code will display the main message followed by the arguments in JSON format.

## Nest.js integration

1. Create a custom logger service in your Nest.js application.
    ```typescript
    import { Injectable, LoggerService } from '@nestjs/common';
    import * as logger from 'better-console-log-plus';

    @Injectable()
    export class CustomLogger implements LoggerService {
        log(message: any, context?: string) {
            logger.log(message, context || '');
        }

        error(message: any, trace?: string, context?: string) {
            logger.error(message, trace || '', context || '');
        }

        warn(message: any, context?: string) {
            logger.warn(message, context || '');
        }

        debug?(message: any, context?: string) {
            logger.debug(message, context || '');
        }
    }
    ```
    The custom logger service implements the Nest.js `LoggerService` interface and utilizes the `better-console-log-plus` package for logging.

2. Register the custom logger service in your application module.
    ```typescript
    import { Module } from '@nestjs/common';
    import { CustomLogger } from './CustomLoggerService';

    @Module({
        providers: [CustomLogger],
        // ...
        exports: [CustomLogger]
    })
    export class AppModule {}
    ```

    Make sure to include the \`CustomLogger\` in the \`providers\` array of your application module.

3. Use the custom logger throughout your application.

    ```typescript
    import { Controller, Get, Inject } from '@nestjs/common';
    import { CustomLogger } from './CustomLoggerService';

    @Controller()
    export class AppController {
        constructor(private readonly _logger: CustomLogger) {}

        @Get()
        getData() {
            this._logger.log('Logging a message');
            this._logger.error('Logging an error');
            // ...
        }
    }
    ```

    Inject the \`CustomLogger\` into your controllers, services, or other components where logging is required.

## Contributing

If you'd like to contribute to this package, feel free to do so. You can open an issue to report bugs or suggest improvements, or submit a pull request to contribute code.

## License

This package is licensed under the MIT License. See the [LICENSE](./LICENSE) file for more information.

## Credits

This package was developed by [Ignacio Chemes](https://github.com/ignaciochemes).