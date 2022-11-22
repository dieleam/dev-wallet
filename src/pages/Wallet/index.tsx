import { Box, Flex, Slider, SliderFilledTrack, SliderThumb, SliderTrack, Text } from "@chakra-ui/react";
import { FC, useEffect, useState } from "react";
import { Pie, PieChart, Tooltip } from "recharts";
import InputNumber from "../../components/InputNumber";
import { PieWalletChartProps } from "./types";

interface WalletPageProps { }

const WalletPage: FC<WalletPageProps> = () => {
    const [fix, setFix] = useState<number>(60)
    const [action, setAction] = useState<number>(20)
    const [fii, setFii] = useState<number>(20)
    const [cripto, setCripto] = useState<number>(0)
    const [walletConfig, setWalletConfig] = useState<PieWalletChartProps[]>([])
    const [investment, setInvestment] = useState<PieWalletChartProps[]>([])
    const [value, setValue] = useState<number>(0)

    const onChangeValue = (field: string, value: number) => {
        if (cannotChange(field, value) === false) {
            return
        }

        let newDataChart = walletConfig.map((el) => {
            if (el.id === field) {
                el.value = value
            }

            return el
        })

        switch (field) {
            case 'fix':
                setFix(value)
                break;
            case 'action':
                setAction(value)
                break;
            case 'fii':
                setFii(value)
                break;
            case 'cripto':
                setCripto(value)
                break;
        }

        saveLocalStorage(field, value)
        setWalletConfig(newDataChart)
    }

    const cannotChange = (field: string, value: number) => {
        let fixValue = fix
        let fiiValue = fii
        let actionValue = action
        let criptoValue = cripto

        switch (field) {
            case 'fix':
                fixValue = value
                break;
            case 'action':
                actionValue = value
                break;
            case 'fii':
                fiiValue = value
                break;
            case 'cripto':
                criptoValue = value
                break;
        }

        return (fixValue + actionValue + fiiValue + criptoValue) <= 100
    }

    const mountLocalStorageKey = (key: string): string => {
        return `option-${key}`
    }

    const saveLocalStorage = (field: string, value: number) => {
        localStorage.setItem(mountLocalStorageKey(field), value.toString())
    }

    const readLocalStorage = (field: string): number => {
        let value = localStorage.getItem(mountLocalStorageKey(field))

        if (value !== null) {
            return parseFloat(value)
        }

        return 0
    }

    useEffect(() => {
        let fixValue = readLocalStorage('fix')
        let fiiValue = readLocalStorage('fii')
        let actionValue = readLocalStorage('action')
        let criptoValue = readLocalStorage('cripto')

        setFix(fixValue)
        setFii(fiiValue)
        setAction(actionValue)
        setCripto(criptoValue)

        setWalletConfig([
            { name: 'Renda Fixa', value: fixValue, id: 'fix' },
            { name: 'FII', value: fiiValue, id: 'fii' },
            { name: 'Ações', value: actionValue, id: 'action' },
            { name: 'Criptomoeda', value: criptoValue, id: 'cripto' },
        ])

        setInvestment([
            { name: 'Renda Fixa', value: value * (fixValue / 100), id: 'fix' },
            { name: 'FII', value: fiiValue, id: 'fii' },
            { name: 'Ações', value: actionValue, id: 'action' },
            { name: 'Criptomoeda', value: criptoValue, id: 'cripto' },
        ])
    }, [])

    useEffect(() => {
        setInvestment(walletConfig.map(el => {
            return {...el, value: value * (el.value / 100)}
        }))
    }, [value, walletConfig])

    return (
        <>
            <Flex direction="column" mx="32">
                <Text fontSize='2xl' mb={8} borderBottom="2px">Configuração do Aporte</Text>
                <Flex mb={8} alignItems='center'>
                    <Text fontSize='xl' mr='4'>Qual valor deseja aportar?</Text>
                    <InputNumber onChange={(v) => setValue(v)} format={(v) => `R$ ${v}`} />
                </Flex>
                <Flex justifyContent='center'>
                    <Box w="96" flex='1'>
                        <Text marginBottom='4' fontSize='xl'>Configure sua carteira:</Text>
                        <Text>Renda Fixa</Text>
                        <Slider aria-label='slider-ex-1'
                            defaultValue={60}
                            value={fix}
                            onChange={(val) => onChangeValue('fix', val)}
                        >
                            <SliderTrack>
                                <SliderFilledTrack />
                            </SliderTrack>
                            <SliderThumb />
                        </Slider>
                        <Text>Ações Nacionais</Text>
                        <Slider aria-label='slider-ex-1'
                            defaultValue={20}
                            value={action}
                            onChange={(val) => onChangeValue('action', val)}
                        >
                            <SliderTrack>
                                <SliderFilledTrack />
                            </SliderTrack>
                            <SliderThumb />
                        </Slider>
                        <Text>FII</Text>
                        <Slider aria-label='slider-ex-1'
                            defaultValue={20}
                            value={fii}
                            onChange={(val) => onChangeValue('fii', val)}
                        >
                            <SliderTrack>
                                <SliderFilledTrack />
                            </SliderTrack>
                            <SliderThumb />
                        </Slider>
                        <Text>Criptomoedas</Text>
                        <Slider aria-label='slider-ex-1'
                            defaultValue={0}
                            value={cripto}
                            onChange={(val) => onChangeValue('cripto', val)}
                        >
                            <SliderTrack>
                                <SliderFilledTrack />
                            </SliderTrack>
                            <SliderThumb />
                        </Slider>
                        <Text>Não alocado</Text>
                        <Slider aria-label='slider-ex-1'
                            defaultValue={0}
                            value={cripto}
                            isDisabled
                            onChange={(val) => onChangeValue('cripto', val)}
                        >
                            <SliderTrack>
                                <SliderFilledTrack />
                            </SliderTrack>
                            <SliderThumb />
                        </Slider>
                    </Box>
                    <Box>
                        <PieChart width={400} height={400}>
                            <Pie
                                dataKey="value"
                                isAnimationActive={false}
                                data={walletConfig}
                                fill="#8884d8"
                                label
                            />
                            <Tooltip />
                        </PieChart>
                    </Box>
                    <Box>
                        <PieChart width={400} height={400}>
                            <Pie
                                dataKey="value"
                                isAnimationActive={false}
                                data={investment}
                                fill="#8884d8"
                                label
                            />
                            <Tooltip />
                        </PieChart>
                    </Box>
                </Flex>
            </Flex>
        </>
    )
}

export default WalletPage
