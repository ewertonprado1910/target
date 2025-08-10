import { StyleSheet } from "react-native"

import { colors, fontFamily } from "@/theme"


export const styles = StyleSheet.create({
    container: {
        gap: 5,
    },
    header: {
        flexDirection: "row",
        alignItems: "center",
        gap: 5,
    },
    label: {
        fontFamily: fontFamily.regular,
        fontSize: 13,
        color: colors.white
    },
    value: {
        fontFamily: fontFamily.regular,
        fontSize: 20,
        color: colors.green[600]
    }

})