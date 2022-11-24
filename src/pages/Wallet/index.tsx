import { Box, Flex, Slider, SliderFilledTrack, SliderThumb, SliderTrack, Text } from "@chakra-ui/react";
import { FC, useEffect, useState } from "react";
import { Pie, PieChart, Tooltip } from "recharts";
import InputNumber from "../../components/InputNumber";
import { InvestmentName, InvestmentType, WalletConfig } from "./types";

interface WalletPageProps { }

const WalletPage: FC<WalletPageProps> = () => {
    const [walletConfig, setWalletConfig] = useState<WalletConfig[]>([])
    const [investment, setInvestment] = useState<WalletConfig[]>([])
    const [value, setValue] = useState<number>(50)
    const WALLET_CONFIG_LOCAL_KEY = 'wdev:wallet-config'

    const onChangeValue = (field: InvestmentType, value: number) => {
        if (cannotChange(field, value) === false) {
            return
        }

        let newConfig = walletConfig.map((el) => {
            if (el.type === field) {
                el.value = value
            }

            return el
        })

        localStorage.setItem(WALLET_CONFIG_LOCAL_KEY, JSON.stringify(walletConfig))
        setWalletConfig(newConfig)
    }

    const cannotChange = (type: InvestmentType, value: number) => {
        let sum = 0
        walletConfig.forEach((el) => {
            if (el.type === type) {
                el.value = value
            }

            sum += el.value
        })

        return sum <= 100
    }

    const readValueFromConfig = (type: InvestmentType) => {
        return walletConfig.find((c) => (c.type === type))?.value || 0
    }

    useEffect(() => {
        let walletConfigStoraged = localStorage.getItem(WALLET_CONFIG_LOCAL_KEY)
        let walletParsed: WalletConfig[]

        if (walletConfigStoraged === null || walletConfigStoraged === undefined) {
            walletParsed = [
                { type: InvestmentType.ACTION_BR, value: 0, name: InvestmentName[InvestmentType.ACTION_BR] },
                { type: InvestmentType.ACTION_IN, value: 0, name: InvestmentName[InvestmentType.ACTION_IN] },
                { type: InvestmentType.FII, value: 0, name: InvestmentName[InvestmentType.FII] },
                { type: InvestmentType.CRIPTO, value: 0, name: InvestmentName[InvestmentType.CRIPTO] },
                { type: InvestmentType.FIX, value: 0, name: InvestmentName[InvestmentType.FIX] },
            ]
        } else {
            walletParsed = JSON.parse(walletConfigStoraged)
        }

        setWalletConfig(walletParsed)
    }, [])

    useEffect(() => {
        setInvestment(walletConfig.map(el => {
            return { ...el, value: value * (el.value / 100) }
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
                        {Object.values(InvestmentType).map((type, i) => (
                            <Box key={i}>
                                <Text>{InvestmentName[type]}</Text>
                                <Slider
                                    defaultValue={60}
                                    value={readValueFromConfig(type)}
                                    onChange={(val) => onChangeValue(type, val)}
                                >
                                    <SliderTrack>
                                        <SliderFilledTrack />
                                    </SliderTrack>
                                    <SliderThumb />
                                </Slider>
                            </Box>
                        ))}
                        <Box>
                            <Text>Não Alocado</Text>
                            <Slider
                                isDisabled
                                value={100 - walletConfig.reduce((acc, cur) => acc + cur.value, 0)}
                            >
                                <SliderTrack>
                                    <SliderFilledTrack />
                                </SliderTrack>
                                <SliderThumb />
                            </Slider>
                        </Box>
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
