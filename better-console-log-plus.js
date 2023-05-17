const util = require('util');

const colors = {
    white: '\u001b[37m',
    gray: '\u001b[90m',
    green: '\u001b[32m',
    blue: '\u001b[34m',
    yellow: '\u001b[33m',
    red: '\u001b[31m',
    reset: '\u001b[0m'
};

function getTimeStamp() {
    const format = new Intl.DateTimeFormat([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
    const now = new Date();
    const formattedTime = format.format(now);
    return `${colors.gray}[${formattedTime}]${colors.reset}`;
}

function createLogFunction(prefix, color) {
    const prefixFormat = colors[color] + `[${prefix}]` + colors.reset;
    return (message, ...args) => {
        const timestamp = getTimeStamp();
        const formattedArgs = args.map(arg => typeof arg === 'object' ? JSON.stringify(arg) : arg);
        const logMessage = util.format(`${timestamp}${prefixFormat}: ${message} %s`, ...formattedArgs);
        console.log(logMessage.trim());
    };
}

const logger = {
    log: createLogFunction('LOG', 'white'),
    error: createLogFunction('ERROR', 'red'),
    warn: createLogFunction('WARN', 'yellow'),
    info: createLogFunction('INFO', 'blue'),
    debug: createLogFunction('DEBUG', 'green')
};

module.exports = logger;