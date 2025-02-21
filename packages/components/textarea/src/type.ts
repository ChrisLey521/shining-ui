import { CommonInputProps } from '../../input/src/type'

interface TextareaProps extends CommonInputProps {
    rows?: number
    autosize?: boolean | Record<'minRow' | 'maxRow', number>
    resize?: boolean
}

export {
    TextareaProps
}
