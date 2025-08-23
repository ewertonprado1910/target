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
import { useTransactionsDatabase } from "@/database/useTransactionsDatabase"


export default function InProgress() {
    const [transactions, setTransactions] = useState<TransactionProps[]>([])
    const [isFetching, setIsFetching] = useState(true)

    const [details, setDetails] = useState({
        name: "",
        current: "R$ 0,00",
        target: "R$ 0,00",
        percentage: 0,
    })

    const params = useLocalSearchParams<{ id: string }>()

    const targetDatabase = useTargetDatabase()
    const transactionsDatabase = useTransactionsDatabase()


    async function fetchTargetDetails() {
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

    async function fetchTransitions() {
        try {
            const response = await transactionsDatabase.listByTargetId
                (Number(params.id))

            setTransactions(
                response.map((item) => ({
                    id: String(item.id),
                    value: numberToCurrency(item.amount),
                    date: String(item.created_at),
                    description: item.observation,
                    type: item.amount < 0 ? TransactionTypes.Output : TransactionTypes.Input
                }))
            )
        } catch (error) {
            Alert.alert("Erro", "Erro ao carregar as transações")
            console.log(error)
        }
    }

    async function fetchData() {
        const fetchDetailsPromise = fetchTargetDetails()
        const fetchTransitionsPromise = fetchTransitions()

        await Promise.all([fetchDetailsPromise, fetchTransitionsPromise])
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