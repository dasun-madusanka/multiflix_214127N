import React from "react";
import { Toast, ToastTitle } from "@/components/ui/toast";
import { VStack } from "@/components/ui/vstack";
import { HStack } from "@/components/ui/hstack";
// import { Heading } from "@/components/ui/heading";
import { Text } from "@/components/ui/text";
import { LinkText } from "@/components/ui/link";
import {
  FormControl,
  FormControlError,
  FormControlLabelText,
  FormControlLabel,
} from "@/components/ui/form-control";
import { Input, InputField, InputSlot, InputIcon } from "@/components/ui/input";
import {
  Checkbox,
  CheckboxIndicator,
  CheckboxIcon,
  CheckboxLabel,
} from "@/components/ui/checkbox";
import { Button, ButtonText, ButtonIcon } from "@/components/ui/button";
import { Icon } from "@/components/ui/icon";
import { Pressable } from "@/components/ui/pressable";
import Link from "@unitools/link";
import {
  ArrowLeftIcon,
  EyeIcon,
  EyeOffIcon,
  CheckIcon,
} from "@/components/ui/icon";
import { GoogleIcon } from "@/assets/icons/google";
import { AuthLayout } from "@/app/AuthLayout";
import { useRouter } from "expo-router";

const LoginWithLeftBackground = () => {
  const router = useRouter();
  const [showPassword, setShowPassword] = React.useState(false);
  const handleState = () => {
    setShowPassword((showState) => {
      return !showState;
    });
  };
  return (
    <VStack className="max-w-[440px] w-full" space="md">
      <VStack className="md:items-center" space="md">
        <VStack>
          <Text className="md:text-center" size="3xl">
            Log in
          </Text>
          <Text>Login to start using Multiflix</Text>
        </VStack>
      </VStack>

      <VStack className="w-full">
        <VStack space="xl" className="w-full">
          <FormControl className="w-full">
            <FormControlLabel>
              <FormControlLabelText>User Name</FormControlLabelText>
            </FormControlLabel>
            <Input size="lg">
              <InputField placeholder="Enter User Name" />
            </Input>
          </FormControl>

          <FormControl className="w-full">
            <FormControlLabel>
              <FormControlLabelText>Password</FormControlLabelText>
            </FormControlLabel>
            <Input size="lg">
              <InputField type="password" placeholder="Enter password" />
              <InputSlot className="pr-3" onPress={handleState}>
                <InputIcon as={showPassword ? EyeIcon : EyeOffIcon} />
              </InputSlot>
            </Input>
          </FormControl>

          <HStack className="w-full justify-between">
            <Checkbox value="" size="sm" aria-label="Remember me">
              <CheckboxIndicator>
                <CheckboxIcon as={CheckIcon} />
              </CheckboxIndicator>
              <CheckboxLabel>Remember me</CheckboxLabel>
            </Checkbox>
            <Link href="/auth/forgot-password">
              <LinkText className="font-medium text-sm text-primary-700 group-hover/link:text-primary-600">
                Forgot Password?
              </LinkText>
            </Link>
          </HStack>
        </VStack>

        <VStack className="w-full my-7" space="lg">
          <Button className="w-full" onPress={() => router.push("Home")}>
            <ButtonText className="font-medium">Log in</ButtonText>
          </Button>
        </VStack>

        <HStack className="self-center" space="sm">
          <Text onPress={() => router.push("SignUp")} size="md">
            Don't have an account?
          </Text>
          {/* <Link href="/auth/signup">
            <LinkText
              className="font-medium text-primary-700 group-hover/link:text-primary-600  group-hover/pressed:text-primary-700"
              size="md"
            >
              Sign up
            </LinkText>
          </Link> */}
        </HStack>
      </VStack>
    </VStack>
  );
};

export default function SignIn() {
  return (
    <AuthLayout>
      <LoginWithLeftBackground />
    </AuthLayout>
  );
}
