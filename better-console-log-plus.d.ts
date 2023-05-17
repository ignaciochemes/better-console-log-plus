declare module 'better-console-log-plus' {
    type logger = (message: string) => void;

    interface Logger {
        log: logger;
        error: logger;
        warn: logger;
        info: logger;
        debug: logger;
    }

    const logger: Logger;

    export default logger;
}