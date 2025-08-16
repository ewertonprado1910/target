import { StyleSheet } from "react-native"

import { colors, fontFamily } from "@/theme"

export const styles = StyleSheet.create({
    container: {
        width: "100%"
    },
    label: {
        fontFamily: fontFamily.medium,
        fontSize: 12,
        color: colors.gray[500],
        marginBottom: 5
    },
    status: {
        width: "100%",
        flexDirection: "row",
        alignItems: "flex-end"
    },
    value: {
        fontFamily: fontFamily.medium,
        fontSize: 18,
        color: colors.black,
        flex: 1
    },
    target: {
        fontFamily: fontFamily.medium,
        fontSize: 14,
        color: colors.gray[500]
    },
    percentage: {
        fontFamily: fontFamily.bold,
        fontSize: 14,
        color: colors.blue[500]
    },
    progress: {
        marginTop: 16,
        width: "100%",
        height: 5,
        borderRadius: 5,
        backgroundColor: colors.gray[400],
        overflow: "hidden"
    },
    currentProgress: {
        height: 5,
        backgroundColor: colors.blue[500]
    }
})