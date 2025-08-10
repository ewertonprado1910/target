import { router } from "expo-router"
import { View, Text, Button, StatusBar } from "react-native"

import { HomeHeader } from "@/components/HomeHeader"
import { colors } from "@/theme"

const summary = {
    total: "R$ 2.567,25",
    input: { label: "Entrada", value: "R$ 6.184,90" },
    output: { label: "Saida", value: "-R$ 850.75" }
}
export default function Index() {
    return (
        <View style={{ flex: 1 }}>
            <StatusBar barStyle="light-content" backgroundColor={colors.blue[250]} />
            <HomeHeader data={summary} />
        </View>
    )
}