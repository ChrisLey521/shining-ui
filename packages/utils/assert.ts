enum LogLevel {
    Error = 'error',
    Warning = 'warning',
    Info = 'log'
}

const assert = (condition: boolean, msg: string, logLevel = LogLevel.Error) => {
    if (condition) return
    console[logLevel](`[shining-ui ${logLevel}]: ${msg}`)
}

export {
    assert
}
