export interface SliderWithNumberProps {
    onChange?: (val: number) => any
    title: string
    value?: number
    format?: (v: string) => string
    parse?: (v: string) => number
    inputW?: string
    isDisabled?: boolean
}