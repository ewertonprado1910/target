import { router } from "expo-router"
import { StatusBar, View } from "react-native"


import { Button } from "@/components/Button"
import { Input } from "@/components/Input"
import { PagesHeader } from "@/components/PagesHeader"
import { CurrencyInput } from "@/components/CurrencyInput"

import { colors } from "@/theme"

export default function Target() {
    return (
        <View style={{ flex: 1, padding: 24 }} >
            <StatusBar barStyle="dark-content" backgroundColor={colors.white} />

            <PagesHeader
                title="Meta"
                subtitle="Economize para seu ojetivo..."
            />

            <View style={{ marginTop: 30, gap: 24 }}>
                <Input
                    label="Nome da meta"
                    placeholder="Ex: Vaigem para praia..."
                />
                <CurrencyInput label="Valor alvo" value={0}/>
                <Button title="Salvar" />
            </View>


        </View>
    )
}