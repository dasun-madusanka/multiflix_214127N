import { Stack, useSegments } from "expo-router";
import { GluestackUIProvider } from "@/components/ui/gluestack-ui-provider";
import "@/global.css";
import { View } from "react-native";

export default function Layout() {
    return(
        <GluestackUIProvider mode="dark">
            <Stack />

        </GluestackUIProvider>
        
    )
}