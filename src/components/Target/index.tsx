import { TouchableOpacity, TouchableOpacityProps, View, Text } from "react-native"
import { MaterialIcons } from "@expo/vector-icons"


import { styles } from "./styles"

export type TargetProps = {
    id?: string
    name: string
    porcentage: string
    current: string
    target: string
}

type Props = TouchableOpacityProps & {
    data: TargetProps
}

export function Target({ data, ...rest }: Props) {
    return (
        <TouchableOpacity style={styles.container} {...rest}>
            <View style={styles.content}>

                <Text style={styles.name} numberOfLines={1}>
                    {data.name}
                </Text>

                <Text style={styles.status}>
                    {data.porcentage} • {data.current} de {data.target}
                </Text>
            </View>
            <MaterialIcons name="chevron-right" size={20} />
        </TouchableOpacity>

    )
}