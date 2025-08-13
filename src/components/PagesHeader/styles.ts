import { StyleSheet } from "react-native"

import { colors, fontFamily } from "@/theme"

export const styles = StyleSheet.create({
    container: {
        width: "100%",
        paddingTop: 30,
    },
    header: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginBottom: 30, 
    },
    title: {
        fontFamily: fontFamily.bold,
        fontSize: 25,
        color: colors.black,
        marginBottom: 10
    },
    subtitle: {
        fontFamily: fontFamily.regular,
        fontSize: 15,
        color: colors.gray[600]
        
    }
})