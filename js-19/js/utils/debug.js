// Debug class

export class Debug {
    static LEVELS = {
        ERROR: 0,
        WARN: 1,
        INFO: 2,
        DEBUG: 3,
        TRACE: 4
    }
    static currentLevel = this.LEVELS.INFO;
    static enabled = false;

    static formatMessage(message, category) {
        const timestamp = new Date().toISOString();
        return `${timestamp}, [${category}]: ${message}`;
    }

    static error(message, category = 'GENERAL') {
        if (this.enabled && this.currentLevel >= this.LEVELS.ERROR) {
            console.error(this.formatMessage(message, category));
        }
    }

    static wanr(message, category = 'GENERAL') {
        if (this.enabled && this.currentLevel >= this.LEVELS.WARN) {
            console.warn(this.formatMessage(message, category));
        }
    }

    static info(message, category = 'GENERAL') {
        if (this.enabled && this.currentLevel >= this.LEVELS.INFO) {
            console.info(this.formatMessage(message, category));
        }
    }

    static debug(message, category = 'GENERAL') {
        if (this.enabled && this.currentLevel >= this.LEVELS.DEBUG) {
            console.debug(this.formatMessage(message, category));
        }
    }

    static trace(message, category = 'GENERAL') {
        if (this.enabled && this.currentLevel >= this.LEVELS.TRACE) {
            console.log(this.formatMessage(message, category));
        }
    }


}

