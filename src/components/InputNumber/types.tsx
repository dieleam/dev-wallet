export interface InputNumberProps {
    format?: (v: string) => string
    parse?: (v: string) => number
    onChange?: (v: number) => any
}