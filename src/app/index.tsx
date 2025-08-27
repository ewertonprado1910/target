import { useCallback, useState } from "react"
import { router, useFocusEffect } from "expo-router"
import { View, StatusBar, Alert } from "react-native"
import { LinearGradient } from "expo-linear-gradient"

import { HomeHeader, HomeHeaderProps } from "@/components/HomeHeader"
import { Target, TargetProps } from "@/components/Target"
import { List } from "@/components/List"
import { Button } from "@/components/Button"
import { Loading } from "@/components/Loading"

import { colors } from "@/theme"

import { numberToCurrency } from "@/utils/numberToCurrency"

import { useTargetDatabase } from "@/database/useTargetDatabase"
import { useTransactionsDatabase } from "@/database/useTransactionsDatabase"


export default function Index() {
    const [summary, setSummary] = useState<HomeHeaderProps>()
    const [isFetching, setIsFatching] = useState(true)
    const [targets, setTargets] = useState<TargetProps[]>([])

    const targetDataBase = useTargetDatabase()
    const transactionsDatabase = useTransactionsDatabase()


    async function fetchTargets(): Promise<TargetProps[]> {
        try {
            const response = await targetDataBase.listBySavedValue()

            return response.map((item) => ({
                id: String(item.id),
                name: item.name,
                current: numberToCurrency(item.current),
                percentage: item.percentage.toFixed(0) + "%",
                target: numberToCurrency(item.amount)
            }))


        } catch (error) {
            Alert.alert("Erro", "Não foi possível carregar as metas.")
        }
    }

    async function fatchSumarry(): Promise<HomeHeaderProps> {
        try {
            const response = await transactionsDatabase.summary()

            return {
                total: numberToCurrency(response.input + response.output),
                input: {
                    label: "Entradas",
                    value: numberToCurrency(response.input)
                },
                output: {
                    label: "Saidas",
                    value: numberToCurrency(response.output)
                }
            }

        } catch (error) {
            Alert.alert("Erro", "Erro ao carregar o resumo!")
            console.log(error)
        }
    }

    async function fatchData() {
        const targetDataPromise = fetchTargets()
        const dataSumarryPromise = fatchSumarry()

        const [targetData, dataSummary] = await Promise.all(
            [targetDataPromise, dataSumarryPromise])

        setTargets(targetData)
        setSummary(dataSummary)

        setIsFatching(false)

    }

    useFocusEffect(
        useCallback(() => {
            fatchData()
        }, [])

    )

    if (isFetching) {
        return <Loading />
    }


    return (
        <View style={{ flex: 1 }}>
            <LinearGradient colors={[colors.blue[250], colors.blue[800]]}>
                <StatusBar barStyle="light-content" />
            </LinearGradient>

            <HomeHeader data={summary} />

            <List
                title="Metas"
                data={targets}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => <Target data={item}
                    onPress={() => router.navigate(`/in-progress/${item.id}`)}
                />}
                emptyMessage="Não a metas por enquanto..."
                containerStyle={{ paddingHorizontal: 24 }}
            />
            <View style={{ padding: 24, paddingBottom: 40 }}>
                <Button title="Nova Meta" onPress={() => router.navigate("/target")} />
            </View>

        </View>
    )
}