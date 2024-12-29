import React from 'react';
import { View } from 'react-native';
import { Box } from '@/components/ui/box';
import { Text } from '@/components/ui/text';
import { Button, ButtonText } from '@/components/ui/button';
import { useRouter } from 'expo-router';
// import { SignIn } from './SignIn';
import { S } from '@expo/html-elements';

export default function App() {
    const router = useRouter();
    return(
        <Box>
            <Text>App</Text>
            <Button action='primary' onPress={() => router.push("SignIn")}>
                <ButtonText>Click me</ButtonText>
            </Button>
            {/* <SignIn /> */}
        </Box>
    )
}