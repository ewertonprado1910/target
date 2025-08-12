import { router } from "expo-router"
import { View, Text, Button, StatusBar } from "react-native"

import { HomeHeader } from "@/components/HomeHeader"
import { colors } from "@/theme"
import { Target } from "@/components/Target"
import { Separator } from "@/components/Separator"
import { List } from "@/components/List"

const summary = {
    total: "R$ 2.567,25",
    input: { label: "Entrada", value: "R$ 6.184,90" },
    output: { label: "Saida", value: "-R$ 850.75" }
}

const targets = [
    {
        id: "1",
        name: "Apple Watch",
        porcentage: "50%",
        current: "R$ 580.00",
        target: "R$ 1790.00"
    },
    {
        id: "2",
        name: "Comprar um Celular",
        porcentage: "80%",
        current: "R$ 580.00",
        target: "R$ 1790.00"
    },
    {
        id: "3",
        name: "Comprar um colchão",
        porcentage: "80%",
        current: "R$ 580.00",
        target: "R$ 1790.00"
    }

]


export default function Index() {
    return (
        <View style={{ flex: 1 }}>
            <StatusBar barStyle="light-content" backgroundColor={colors.blue[250]} />
            <HomeHeader data={summary} />

            <List
                title="Metas"
                data={targets}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => <Target data={item} />}
                emptyMessage="Não a metas por enquanto..."
                containerStyle={{ paddingHorizontal: 24 }}
            />
        </View>
    )
}