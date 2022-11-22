import { FC } from "react"
import { NumberInput, NumberInputField } from "@chakra-ui/react";
import { InputNumberProps } from "./types";

const InputNumber: FC<InputNumberProps> = ({
    onChange,
    format
}) => {
    const handleChange = (s: string, v: number) => {
        if (onChange !== undefined) {
            onChange(v)
        }
    }

    const handleFormat = (v: string | number): string | number => {
        if (format !== undefined) {
            return format(v as string)
        }

        return ""
    }

    return (
        <NumberInput onChange={handleChange} format={handleFormat}>
            <NumberInputField />
        </NumberInput>
    )
}

export default InputNumber
