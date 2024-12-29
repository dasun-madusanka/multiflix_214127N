import React from 'react';
import { View } from 'react-native';
import { Box } from '@/components/ui/box';
import { Text } from '@/components/ui/text';
import { Button, ButtonText } from '@/components/ui/button';
import { VStack } from '@/components/ui/vstack';
import { HStack } from '@/components/ui/hstack';
import { Image } from '@/components/ui/image';
import { useRouter } from 'expo-router';
// import { SignIn } from './SignIn';
import { S } from '@expo/html-elements';

export default function App() {
    const router = useRouter();
    return(
        <VStack className="w-full h-full bg-background-0 justify-center items-center">
            <Image source={require('@/assets/images/logo.png')} className="w-48 h-48" />
            <Text size="3xl">Welcome to Multiflix</Text>
            <Text>Sign in to start using Multiflix</Text>
            <Button onPress={() => router.push('SignIn')} className="mt-4">
                <ButtonText>Sign In</ButtonText>
            </Button>

        </VStack>
    )
}