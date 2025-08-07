import { ActivityIndicator } from "react-native"

import { style } from "./styles"
import { colors, fontFamily } from "@/theme"


export function Loading() {
    return (
        <ActivityIndicator color={colors.blue[500]}
            style={style.container}
        />
    )
}