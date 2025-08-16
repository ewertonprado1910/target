import { useState } from "react"
import { useGlobalSearchParams } from "expo-router"
import { View } from "react-native"

import { PagesHeader } from "@/components/PagesHeader"
import { CurrencyInput } from "@/components/CurrencyInput"
import { Input } from "@/components/Input"
import { Button } from "@/components/Button"
import { TransactionType } from "@/components/TransactionType"
import { TransactionTypes } from "@/utils/TransactionTypes"

export default function Transaction() {
    const [type, setType] = useState(TransactionTypes.Input)
    const params = useGlobalSearchParams<{ id: string }>()

    return (
        <View style={{ flex: 1, padding: 20 }}>
            <PagesHeader title="Nova Transação" subtitle="A cada valor guardado você fica mais próximo da sua meta. Se esforce para guardar e evitar retirar." />

            <View style={{ marginTop: 30, gap: 20 }}>
                <TransactionType selected={type} onChange={setType}/>
                <CurrencyInput label="Valor" value={0} />
                <Input label="Motivo (opicional)"
                    placeholder="Ex: Investir em CDB de 110% no banco XPTO"
                />
                <Button title="Salvar" />
            </View>
        </View>
    )
}