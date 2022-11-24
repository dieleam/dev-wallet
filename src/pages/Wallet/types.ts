export interface WalletConfig {
    name: string
    value: number
    type: InvestmentType
}

export enum InvestmentType {
    FIX = "FIX",
    ACTION_BR = "ACTION_BR",
    ACTION_IN = "ACTION_IN",
    CRIPTO = "CRIPTO",
    FII = "FII",
}

export enum InvestmentName {
    FIX = "Renda Fixa",
    ACTION_BR = "Ações Brasileiras",
    FII = "Fundos imobiliários",
    ACTION_IN = "Ações Internacionais",
    CRIPTO = "Criptomoedas",
}