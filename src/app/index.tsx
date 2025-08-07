import { fontFamily } from "@/theme"
import { router } from "expo-router"
import { View, Text, Button } from "react-native"

export default function Index() {
    return (
        <View style={{flex: 1, justifyContent: "center" }}>
            <Text >Expo ROUTER</Text>
            <Button title="Navegar" 
            onPress={() => router.navigate("/target")}
            />

            <Button title="Navegar ID" 
            onPress={() => router.navigate("/transaction/44445")}
            />

             <Button title="In-Progress ID" 
            onPress={() => router.navigate("/in-progress/45")}
            />

        </View>
    )
}