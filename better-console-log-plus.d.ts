declare module 'better-console-log-plus' {
    type logger = (message: string, ...args: any[]) => void;

    interface Logger {
        log: logger;
        error: logger;
        warn: logger;
        info: logger;
        debug: logger;
        setLevel: (level: 'error' | 'warn' | 'info' | 'debug') => void;
        setColors: (newColors: Record<string, string>) => void;
    }

    const logger: Logger;

    export = logger;
}

declare module 'better-console-log-plus/default' {
    import logger from 'better-console-log-plus';
    export default logger;
}