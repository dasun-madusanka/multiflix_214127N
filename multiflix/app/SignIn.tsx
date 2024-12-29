import React from "react";
import { Toast, ToastTitle } from "@/components/ui/toast";
import { VStack } from "@/components/ui/vstack";
import { HStack } from "@/components/ui/hstack";
import { Text } from "@/components/ui/text";
import { LinkText } from "@/components/ui/link";
import {
  FormControl,
  FormControlError,
  FormControlLabelText,
  FormControlLabel,
  FormControlErrorIcon,
  FormControlErrorText,
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
  AlertCircleIcon,
} from "@/components/ui/icon";
import { GoogleIcon } from "@/assets/icons/google";
import { AuthLayout } from "@/app/AuthLayout";
import { useRouter } from "expo-router";
import { User } from "@/types/User";
import { loginUser } from "@/apis/Auth";
import { useAuth } from "@/context/AuthContext";

const LoginWithLeftBackground = () => {
  const router = useRouter();
  const { user, login } = useAuth();
  const [showPassword, setShowPassword] = React.useState(false);
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [usernameError, setUsernameError] = React.useState("");
  const [passwordError, setPasswordError] = React.useState("");
  const [userNameInvalid, setUsernameInvalid] = React.useState(false);
  const [passwordInvalid, setPasswordInvalid] = React.useState(false);

  const [error, setError] = React.useState("");
  const [loading, setLoading] = React.useState(false);

  

  const validateUsername = () => {
    if (!username) {
      setUsernameError("Please enter a username");
      setUsernameInvalid(true);
      return false;
    }
    setUsernameError("");
    setUsernameInvalid(false);
    return true;
  };

  const validatePassword = () => {
    if (!password) {
      setPasswordError("Please enter a password");
      setPasswordInvalid(true);
      return false;
    }
    setPasswordError("");
    setPasswordInvalid(false);
    return true;
  };

  const handleLogin = async () => {
    if (!validateUsername() || !validatePassword()) {
      return;
    }
    if (!username || !password) {
      setError("Please fill all the fields");
      return;
    }
    setLoading(true);
    const user = {
      username,
      password,
    };
    const response = await loginUser(user);

    if (response.error) {
      setError(response.error);
    } else {
      login({
        name: response.user.name,
        token: response.token,
        username: response.user.username,
        email: response.user.email,
        favourites: [],
      });
      router.push("Home");
    }

    setLoading(false);
  };

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
            Sign in
          </Text>
          <Text>Login to start using Multiflix</Text>
        </VStack>
      </VStack>

      <VStack className="w-full">
        <VStack space="xl" className="w-full">
          <FormControl className="w-full" isInvalid={userNameInvalid}>
            <FormControlLabel>
              <FormControlLabelText>User Name</FormControlLabelText>
            </FormControlLabel>
            <Input size="lg">
              <InputField
                placeholder="Enter User Name"
                value={username}
                onChangeText={setUsername}
              />
            </Input>
            <FormControlError>
              <FormControlErrorIcon as={AlertCircleIcon} />
              <FormControlErrorText>{usernameError}</FormControlErrorText>
            </FormControlError>
          </FormControl>

          <FormControl className="w-full" isInvalid={passwordInvalid}>
            <FormControlLabel>
              <FormControlLabelText>Password</FormControlLabelText>
            </FormControlLabel>
            <Input size="lg">
              <InputField
                type={showPassword ? "text" : "password"}
                placeholder="Enter password"
                value={password}
                onChangeText={setPassword}
              />
              <InputSlot className="pr-3" onPress={handleState}>
                <InputIcon as={showPassword ? EyeIcon : EyeOffIcon} />
              </InputSlot>
            </Input>
            <FormControlError>
              <FormControlErrorIcon as={AlertCircleIcon} />
              <FormControlErrorText>{passwordError}</FormControlErrorText>
            </FormControlError>
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
          <Button className="w-full" onPress={handleLogin}>
            <ButtonText className="font-medium">
              {loading ? "Signing in..." : "Sign in"}
            </ButtonText>
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
