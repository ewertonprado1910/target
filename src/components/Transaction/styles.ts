import { StyleSheet } from "react-native"

import { colors, fontFamily } from "@/theme"

export const styles = StyleSheet.create({
    container: {
        paddingVertical: 16,
        flexDirection: "row",
        alignItems: "center",
        gap: 7
    },
    info: {
        flex: 1,
        gap: 7
    },
    value: {
        fontFamily: fontFamily.medium,
        fontSize: 14,
        color: colors.black
    },
    description: {
        fontFamily: fontFamily.regular,
        fontSize: 11,
        color: colors.gray[500]
    }
})