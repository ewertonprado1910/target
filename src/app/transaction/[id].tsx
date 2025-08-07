import { router, useGlobalSearchParams } from "expo-router"
import { Button, Text, View } from "react-native"


export default function Transaction() {
    const params = useGlobalSearchParams<{id: string}>()

    return (
        <View style={{ flex: 1, justifyContent: "center" }}>
            <Text>ID: {params.id}</Text>

            <Button title="Voltar" onPress={() => router.back()}/>
        </View>
    )
}