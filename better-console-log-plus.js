const colors = {
    white: '\u001b[37m',
    gray: '\u001b[90m',
    green: '\u001b[32m',
    blue: '\u001b[34m',
    yellow: '\u001b[33m',
    red: '\u001b[31m',
    reset: '\u001b[0m'
};

const getTimeStamp = (() => {
    const format = new Intl.DateTimeFormat([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
    return () => {
        const now = new Date();
        const formattedTime = format.format(now);
        return `${colors.gray}[${formattedTime}]${colors.reset}`;
    };
})();

const createLogFunction = (prefix, color) => {
    const prefixFormat = colors[color] + `[${prefix}]` + colors.reset;
    return (message) => {
        const timestamp = getTimeStamp();
        console.log(`${timestamp}${prefixFormat}: ${message}`);
    };
};

const logger = {
    log: createLogFunction('LOG', 'white'),
    error: createLogFunction('ERROR', 'red'),
    warn: createLogFunction('WARN', 'yellow'),
    info: createLogFunction('INFO', 'blue'),
    debug: createLogFunction('DEBUG', 'green')
};

module.exports = logger;