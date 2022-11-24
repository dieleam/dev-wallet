import { Box, Flex, NumberInput, NumberInputField, Slider, SliderFilledTrack, SliderThumb, SliderTrack, Text } from "@chakra-ui/react"
import { FC } from "react"
import InputNumber from "../InputNumber"
import { SliderWithNumberProps } from "./types"

const SliderWithNumber: FC<SliderWithNumberProps> = ({
    onChange,
    title,
    value,
    format,
    inputW,
    isDisabled
}) => {    
    const handleFormat = (val: string | number) => {
        if (format !== undefined) {
            return format(val as string)
        }

        return val
    }

    return (
        <Flex alignItems='center'>
            <Box flex={1}>
                <Text>{title}</Text>
                <Slider
                    value={value}
                    onChange={onChange}
                >
                    <SliderTrack>
                        <SliderFilledTrack />
                    </SliderTrack>
                    <SliderThumb />
                </Slider>
            </Box>
            <Box ml='4'>
            <NumberInput w={inputW} value={value} isDisabled={isDisabled} format={handleFormat}>
                <NumberInputField />
            </NumberInput>
            </Box>
        </Flex>
    )
}

export default SliderWithNumber
