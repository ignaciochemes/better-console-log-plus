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

function createLogFunction(prefix, color, timestamp) {
    const prefixFormat = timestamp ? colors[color] + `[${prefix}]` + colors.reset : `[${prefix}]`;
    return (message, ...args) => {
        const formattedMessage = args.length > 0 ? util.format(`${timestamp}${prefixFormat}: ${message}`, ...args) : `${timestamp}${prefixFormat}: ${message}`;
        console.log(formattedMessage.trim());
    };
}

const timestamp = getTimeStamp();

const logger = {
    log: createLogFunction('LOG', 'white', timestamp),
    error: createLogFunction('ERROR', 'red', timestamp),
    warn: createLogFunction('WARN', 'yellow', timestamp),
    info: createLogFunction('INFO', 'blue', timestamp),
    debug: createLogFunction('DEBUG', 'green', timestamp)
};

module.exports = logger;