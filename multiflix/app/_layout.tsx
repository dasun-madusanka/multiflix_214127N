import { Stack, useSegments } from "expo-router";
import { GluestackUIProvider } from "@/components/ui/gluestack-ui-provider";
import "@/global.css";
import { AuthProvider } from "@/context/AuthContext";
import { View } from "react-native";

export default function Layout() {
  return (
    <AuthProvider>
    <GluestackUIProvider mode="dark">
      <Stack
        screenOptions={{
          headerShown: false,
        }}
      />
    </GluestackUIProvider>
    </AuthProvider>
  );
}
