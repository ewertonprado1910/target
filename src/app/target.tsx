import { useEffect, useState } from "react"
import { StatusBar, View, Alert } from "react-native"
import { router, useLocalSearchParams } from "expo-router"


import { Button } from "@/components/Button"
import { Input } from "@/components/Input"
import { PagesHeader } from "@/components/PagesHeader"
import { CurrencyInput } from "@/components/CurrencyInput"

import { useTargetDatabase } from "@/database/useTargetDatabase"

import { colors } from "@/theme"

export default function Target() {
    const [isProcessing, setIsProcessing] = useState(false)
    const [name, setName] = useState("")
    const [amount, setAmount] = useState(0)

    const params = useLocalSearchParams<{ id?: string }>()
    const targetDataBase = useTargetDatabase()

    function handleSave() {
        if (!name.trim() || amount <= 0) {
            return Alert.alert("Atenção", "Coloque nome e valor!")
        }

        setIsProcessing(false)

        if (params.id) {
            updateTarget()
        } else {
            create()
        }
    }

    async function updateTarget() {
        try {
            await targetDataBase.update({ id: Number(params.id), name, amount })
            Alert.alert("Sucesso!", "Meta atualizada com sucesso.", [
                {
                    text: "Ok",
                    onPress: () => router.back()
                }
            ])
        } catch (error) {
            Alert.alert("Erro", "Não foi possível atualizar a meta.")
            setIsProcessing(false)
        }
    }

    async function create() {
        try {
            await targetDataBase.create({ name, amount })
            Alert.alert("Nova meta", "Meta criada com sucesso.", [
                {
                    text: "Ok",
                    onPress: () => router.back()
                }
            ])
        } catch (error) {
            Alert.alert("Erro", "Não foi possível criar nova meta!")
            setIsProcessing(false)
        }
    }

    async function fetchDetails(id: number) {
        try {
            const response = await targetDataBase.showTarget(id)
            setName(response.name)
            setAmount(response.amount)

        } catch (error) {
            Alert.alert("Erro", "Não foi possível carregar os detalhes da meta.")
        }
    }

    function handleRemove() {
        if (!params.id) {
            return
        }
        Alert.alert("Remover", "Deseja realmente remover a meta?", [
            { text: "Não", style: "cancel" },
            { text: "Sim", onPress: removeTarget }
        ])
    }

    async function removeTarget() {
        try {
            setIsProcessing(true)

            await targetDataBase.remove(Number(params.id))
            Alert.alert("Sucesso!", "Meta removida com sucesso.", [
                { text: "Ok", onPress: () => router.replace("/") }
            ])
        } catch (error) {
            Alert.alert("Erro", "Erro ao remover a meta.")
        }
    }


    useEffect(() => {
        if (params.id) {
            fetchDetails(Number(params.id))
        }
    }, [params.id])

    return (
        <View style={{ flex: 1, padding: 20 }} >
            <StatusBar barStyle="dark-content" backgroundColor={colors.white} />

            <PagesHeader
                title="Meta"
                subtitle="Economize para seu objetivo..."
                rightButton={
                    params.id ? {
                        icon: "delete",
                        onPress: handleRemove
                    } : undefined
                }
            />

            <View style={{ marginTop: 30, gap: 24 }}>
                <Input
                    label="Nome da meta"
                    placeholder="Ex: Vaigem para praia..."
                    onChangeText={setName}
                    value={name}
                />

                <CurrencyInput label="Valor alvo"
                    value={amount}
                    onChangeValue={setAmount}
                />

                <Button title="Salvar" onPress={handleSave} isProcessing={isProcessing} />
            </View>


        </View>
    )
}