import { StyleSheet } from "react-native"

import { colors, fontFamily } from "@/theme"

export const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    listContent: {
        paddingBottom: 72,
        gap: 16,
        paddingTop: 16
    },
    title: {
        marginTop: 25,
        paddingBottom: 16,
        borderBottomWidth: 1,
        borderBottomColor: colors.gray[300],
        fontSize: 17,
        fontFamily: fontFamily.regular,
        color: colors.black,
    },
    empty: {
        fontSize: 14,
        fontFamily: fontFamily.regular,
        textAlign: "center",
        marginTop: 20,
        color: colors.gray[500]
    }
})