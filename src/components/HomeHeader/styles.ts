import { StyleSheet } from "react-native"

import { colors, fontFamily } from "@/theme"


export const styles = StyleSheet.create({
    container: {
        width: "100%",
        height: 324,
        paddingHorizontal: 24,
        justifyContent: "flex-end",
        paddingBottom: 20,
        gap: 15
    },
    label: {
        fontFamily: fontFamily.regular,
        fontSize: 15,
        color: colors.white
    },
    total: {
        fontFamily: fontFamily.medium,
        fontSize: 35,
        color: colors.white
    },
    summary: {
        width: "100%",
        flexDirection: "row",
        justifyContent: "space-between"
    }
})