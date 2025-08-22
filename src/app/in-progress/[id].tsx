import { Alert, View } from "react-native"
import { useCallback, useState } from "react"
import { router, useFocusEffect, useLocalSearchParams } from "expo-router"


import { List } from "@/components/List"
import { Button } from "@/components/Button"
import { Loading } from "@/components/Loading"
import { Progress } from "@/components/Progress"
import { PagesHeader } from "@/components/PagesHeader"
import { Transaction, TransactionProps } from "@/components/Transaction"


import { TransactionTypes } from "@/utils/TransactionTypes"

import { numberToCurrency } from "@/utils/numberToCurrency"

import { useTargetDatabase } from "@/database/useTargetDatabase"


const transactions: TransactionProps[] = [
    {
        id: "1",
        value: "R$ 300,00",
        date: "12/04/2025",
        description: "CDB de 100% no banco inter",
        type: TransactionTypes.Output
    },
    {
        id: "2",
        value: "R$ 400,00",
        date: "15/04/2025",
        description: "CDB de 100% no banco Itau",
        type: TransactionTypes.Input
    }
]

export default function InProgress() {
    const [isFetching, setIsFetching] = useState(true)

    const [details, setDetails] = useState({
        name: "",
        current: "R$ 0,00",
        target: "R$ 0,00",
        percentage: 0,
    })

    const params = useLocalSearchParams<{ id: string }>()

    const targetDatabase = useTargetDatabase()


    async function fetchDetails() {
        try {
            const response = await targetDatabase.showTarget(Number(params.id))

            setDetails({
                name: response.name,
                current: numberToCurrency(response.current),
                target: numberToCurrency(response.amount),
                percentage: response.percentage
            })

        } catch (error) {
            Alert.alert("Erro", "Não foi possível carregar a meta.")
        }

    }

    async function fetchData() {
        const fetchDetailsPromise = fetchDetails()

        await Promise.all([fetchDetailsPromise])
        setIsFetching(false)
    }

    useFocusEffect(
        useCallback(() => {
            fetchData()
        }, [])

    )

    if (isFetching) {
        return <Loading />
    }

    return (
        <View style={{ flex: 1, padding: 20, gap: 32 }}>
            <PagesHeader
                title={details.name}
                rightButton={{
                    icon: "edit",
                    onPress: () => router.navigate(`/target?id=${params.id}`)
                }}
            />
            <Progress data={details} />
            <List
                title="Transações"
                data={transactions}
                renderItem={({ item }) => (
                    <Transaction
                        data={item}
                        onRemove={() => { }} />
                )}
                emptyMessage="Nenhuma transação, toque em nova transação para fazer uma nova!"
            />
            <Button title="Nova Transação"
                onPress={() => router.navigate(`/transaction/${params.id}`)}
            />
        </View>
    )
}