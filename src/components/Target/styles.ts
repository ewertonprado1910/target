import { StyleSheet } from "react-native"

import { colors, fontFamily } from "@/theme"

export const styles = StyleSheet.create({
    container: {
        width: "100%",
        height: 72,
        flexDirection: "row",
        alignItems: "center",
        gap: 12,  
    },
    content: {
        flex: 1,
        gap: 7
    },
    name: {
        fontFamily: fontFamily.medium,
        fontSize: 18,
        color: colors.black
    },
    status: {
        fontFamily: fontFamily.regular,
        fontSize: 12,
        color: colors.gray[600]
    }
})