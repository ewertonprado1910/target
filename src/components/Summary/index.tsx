import { View, Text, ColorValue } from "react-native"
import { MaterialIcons } from "@expo/vector-icons"

import { styles } from "./styles"
import { colors } from "@/theme"

export type SumaryProps = {
    label: string
    value: string
}

type Props = {
    data: SumaryProps
    icon: {
        name: keyof typeof MaterialIcons.glyphMap
        color: ColorValue
    }
    isRigth?: boolean,
    colorRed?: boolean
}

export function Summary({ data, icon, isRigth = false, colorRed = false }: Props) {
    return (
        <View style={styles.container}>

            <View
                style={[styles.header,
                isRigth && { justifyContent: "flex-end" }]}>
                    
                <MaterialIcons name={icon.name} size={15} color={icon.color} />
                <Text style={styles.label} >{data.label}</Text>
            </View>

            <Text
                style={[styles.value,
                colorRed && { color: colors.red[400] }]}>
                {data.value}</Text>
        </View>
    )
}