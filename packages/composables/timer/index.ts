const useTimeout = () => {
    let timer: NodeJS.Timeout
    const registerTimeout = (cb: (...args: unknown[]) => void, delay?: number) => {
        timer = setTimeout(cb, delay)
    }

    const abortTimeout = () => clearTimeout(timer)

    return {
        registerTimeout,
        abortTimeout
    }
}

const useInterval = () => {
    let timer: NodeJS.Timeout

    const abortInterval = () => clearInterval(timer)

    const registerInterval = (cb: (...args: unknown[]) => void, delay?: number) => {
        timer = setInterval(cb, delay)
    }

    return {
        registerInterval,
        abortInterval
    }
}

export { useInterval, useTimeout }
