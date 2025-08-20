import { router, useLocalSearchParams } from "expo-router"
import { View } from "react-native"

import { PagesHeader } from "@/components/PagesHeader"
import { Progress } from "@/components/Progress"
import { List } from "@/components/List"
import { Transaction, TransactionProps } from "@/components/Transaction"
import { Button } from "@/components/Button"

import { TransactionTypes } from "@/utils/TransactionTypes"

const details = {
    current: "R$ 580,00",
    target: "R$ 1.790,00",
    percentage: 50
}

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
    const params = useLocalSearchParams<{ id: string }>()

    return (
        <View style={{ flex: 1, padding: 20, gap: 32 }}>
            <PagesHeader
                title="Apple Wath"
                rightButton={{
                    icon: "edit",
                    onPress: () => { }
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