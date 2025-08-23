import { useState } from "react"
import { router, useGlobalSearchParams } from "expo-router"
import { Alert, View } from "react-native"

import { Input } from "@/components/Input"
import { Button } from "@/components/Button"
import { PagesHeader } from "@/components/PagesHeader"
import { CurrencyInput } from "@/components/CurrencyInput"
import { TransactionType } from "@/components/TransactionType"

import { TransactionTypes } from "@/utils/TransactionTypes"

import { useTransactionsDatabase } from "@/database/useTransactionsDatabase"

export default function Transaction() {
    const [type, setType] = useState(TransactionTypes.Input)

    const [isCreating, setIsCreating] = useState(false)
    const [amount, setAmount] = useState(0)
    const [observation, setObservation] = useState("")

    const params = useGlobalSearchParams<{ id: string }>()
    const transactionsDatabase = useTransactionsDatabase()


    async function handleCreate() {
        try {
            if (amount <= 0) {
                return Alert.alert("Atenção", "Preencha um valor maior que zero!")
            }
            setIsCreating(true)

            await transactionsDatabase.create({
                target_id: Number(params.id),
                amount: type === TransactionTypes.Output ? amount * -1 : amount,
                observation
            })
            Alert.alert("Sucesso", "Transação salva com sucesso!", [
                {
                    text: "Ok",
                    onPress: () => router.back()
                }
            ])

        } catch (error) {
            Alert.alert("Erro", "Não foi possível salvar a transação")
            console.log(error)
            setIsCreating(false)
        }

    }

    return (
        <View style={{ flex: 1, padding: 20, marginBottom: 10}}>
            <PagesHeader title="Nova Transação" subtitle="A cada valor guardado você fica mais próximo da sua meta. Se esforce para guardar e evitar retirar." />

            <View style={{ marginTop: 20, gap: 10 }}>
                <TransactionType selected={type}
                    onChange={setType}
                />

                <CurrencyInput label="Valor"
                    value={amount}
                    onChangeValue={setAmount}
                />

                <Input label="Motivo (opicional)"
                    placeholder="Ex: Investir em CDB de 110% no banco XPTO"
                    onChangeText={setObservation}

                />
                <Button title="Salvar"
                    onPress={handleCreate}
                    isProcessing={isCreating}
                />
            </View>
        </View>
    )
}