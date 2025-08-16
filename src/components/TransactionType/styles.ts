import { StyleSheet } from "react-native"

import { colors, fontFamily } from "@/theme"

export const styles = StyleSheet.create({
    container: {
        height: 42,
        width: "100%",
        flexDirection: "row",
        backgroundColor: colors.gray[100],
        overflow: "hidden"
    },
    option: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "row",
        borderRadius: 9,
        gap: 5,
    },
    title: {
        fontFamily: fontFamily.medium,
        fontSize: 14,
        color: colors.gray[500]
    }
})