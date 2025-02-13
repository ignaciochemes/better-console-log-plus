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

const levels = {
    error: 0,
    warn: 1,
    info: 2,
    debug: 3
};

let currentLevel = levels.info;

function getTimeStamp() {
    const format = new Intl.DateTimeFormat([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
    const now = new Date();
    const formattedTime = format.format(now);
    return `${colors.gray}[${formattedTime}]${colors.reset}`;
}

function createLogFunction(prefix, color, level) {
    return (message, ...args) => {
        if (level > currentLevel) return; // No mostrar mensajes de nivel inferior
        const timestamp = getTimeStamp();
        const prefixFormat = colors[color] + `[${prefix}]` + colors.reset;
        const formattedMessage = args.length > 0
            ? util.format(`${timestamp}${prefixFormat}: ${message}`, ...args)
            : `${timestamp}${prefixFormat}: ${message}`;
        console.log(formattedMessage.trim());
    };
}

const logger = {
    log: createLogFunction('LOG', 'white', levels.info),
    error: createLogFunction('ERROR', 'red', levels.error),
    warn: createLogFunction('WARN', 'yellow', levels.warn),
    info: createLogFunction('INFO', 'blue', levels.info),
    debug: createLogFunction('DEBUG', 'green', levels.debug),
    setLevel: (level) => {
        if (levels[level] !== undefined) {
            currentLevel = levels[level];
        } else {
            logger.warn(`Invalid log level: ${level}`);
        }
    },
    setColors: (newColors) => {
        Object.assign(colors, newColors); // Actualizar colores
    }
};

module.exports = logger;