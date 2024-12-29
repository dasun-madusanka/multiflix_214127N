import React from "react";
import { useRouter } from "expo-router";
import { Toast, ToastTitle } from "@/components/ui/toast";
import { VStack } from "@/components/ui/vstack";
import { HStack } from "@/components/ui/hstack";
import { Text } from "@/components/ui/text";
import { LinkText } from "@/components/ui/link";
import {
  Select,
  SelectTrigger,
  SelectInput,
  SelectIcon,
  SelectPortal,
  SelectBackdrop,
  SelectContent,
  SelectDragIndicatorWrapper,
  SelectDragIndicator,
  SelectItem,
} from "@/components/ui/select";
import {
  FormControl,
  FormControlError,
  FormControlLabelText,
  FormControlLabel,
  FormControlErrorIcon,
  FormControlErrorText,
} from "@/components/ui/form-control";
import { Pressable } from "@/components/ui/pressable";
import { Input, InputField, InputIcon, InputSlot } from "@/components/ui/input";
import { ChevronDownIcon } from "@/components/ui/icon";
import { Button, ButtonText, ButtonIcon } from "@/components/ui/button";
import { Icon, EyeIcon, EyeOffIcon } from "@/components/ui/icon";
import Link from "@unitools/link";
import {
  ArrowLeftIcon,
  CheckIcon,
  AlertCircleIcon,
} from "@/components/ui/icon";
import { AuthLayout } from "@/app/AuthLayout";
import { User } from "@/types/User";
import { registerUser } from "@/apis/Auth";

const SignUpWithLeftBackground = () => {
  const router = useRouter();
  const [showPassword, setShowPassword] = React.useState(false);
  const [fullName, setFullName] = React.useState("");
  const [username, setUsername] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [gender, setGender] = React.useState("");
  const [fullNameError, setFullNameError] = React.useState("");
  const [usernameError, setUsernameError] = React.useState("");
  const [emailError, setEmailError] = React.useState("");
  const [passwordError, setPasswordError] = React.useState("");
  const [genderError, setGenderError] = React.useState("");
  const [fullNameInvalid, setFullNameInvalid] = React.useState(false);
  const [usernameInvalid, setUsernameInvalid] = React.useState(false);
  const [emailInvalid, setEmailInvalid] = React.useState(false);
  const [passwordInvalid, setPasswordInvalid] = React.useState(false);
  const [genderInvalid, setGenderInvalid] = React.useState(false);
  const [error, setError] = React.useState("");
  const [loading, setLoading] = React.useState(false);

  const validateFullName = () => {
    if (!fullName) {
      setFullNameError("Please enter a full name");
      setFullNameInvalid(true);
      return false;
    }
    setFullNameError("");
    setFullNameInvalid(false);
    return true;
  };

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

  const validateEmail = () => {
    if (!email) {
      setEmailError("Please enter an email");
      setEmailInvalid(true);
      return false;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setEmailError("Please enter a valid email");
      setEmailInvalid(true);
      return false;
    }
    setEmailError("");
    setEmailInvalid(false);
    return true;
  };

  const validatePassword = () => {
    if (!password) {
      setPasswordError("Please enter a password");
      setPasswordInvalid(true);
      return false;
    }
    if (password.length < 6) {
      setPasswordError("Password must be at least 6 characters long");
      setPasswordInvalid(true);
      return false;
    }
    if (!/(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/.test(password)) {
      setPasswordError(
        "Password must contain at least one number and one uppercase and lowercase letter"
      );
      setPasswordInvalid(true);
      return false;
    }
    setPasswordError("");
    setPasswordInvalid(false);
    return true;
  };

  const validateGender = () => {
    if (!gender) {
      setGenderError("Please select a gender");
      setGenderInvalid(true);
      return false;
    }
    setGenderError("");
    setGenderInvalid(false);
    return true;
  };

  const handleSignUp = async () => {
    setLoading(true);
    if (
      !validateFullName() ||
      !validateUsername() ||
      !validateEmail() ||
      !validatePassword() ||
      !validateGender()
    ) {
      setLoading(false);
      return;
    }
    if (!fullName || !username || !email || !password || !gender) {
      setError("Please fill all the fields");
      setLoading(false);
      return;
    }
    const user: User = {
      name: fullName,
      username,
      email,
      password,
      gender,
    };
    const response = await registerUser(user);
    if (response.error) {
      setError(response.error);
      setLoading(false);
    } else {
      router.push("SignIn");
      setLoading(false);
    }
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
            Sign up
          </Text>
          <Text>Create an account to start using Miltiflix</Text>
        </VStack>
      </VStack>

      <VStack className="w-full">
        <VStack space="xl" className="w-full">
          <FormControl className="w-full" isInvalid={fullNameInvalid}>
            <FormControlLabel>
              <FormControlLabelText>Full Name</FormControlLabelText>
            </FormControlLabel>
            <Input size="lg">
              <InputField
                placeholder="Enter your full name"
                value={fullName}
                onChangeText={setFullName}
              />
            </Input>
            <FormControlError>
              <FormControlErrorIcon as={AlertCircleIcon} />
              <FormControlErrorText>{fullNameError}</FormControlErrorText>
            </FormControlError>
          </FormControl>

          <FormControl className="w-full" isInvalid={usernameInvalid}>
            <FormControlLabel>
              <FormControlLabelText>Username</FormControlLabelText>
            </FormControlLabel>
            <Input size="lg">
              <InputField
                placeholder="Enter a username"
                value={username}
                onChangeText={setUsername}
              />
            </Input>
            <FormControlError>
              <FormControlErrorIcon as={AlertCircleIcon} />
              <FormControlErrorText>{usernameError}</FormControlErrorText>
            </FormControlError>
          </FormControl>

          <FormControl className="w-full" isInvalid={emailInvalid}>
            <FormControlLabel>
              <FormControlLabelText>Email</FormControlLabelText>
            </FormControlLabel>
            <Input size="lg">
              <InputField
                placeholder="Enter your email"
                value={email}
                onChangeText={setEmail}
              />
            </Input>
            <FormControlError>
              <FormControlErrorIcon as={AlertCircleIcon} />
              <FormControlErrorText>{emailError}</FormControlErrorText>
            </FormControlError>
          </FormControl>

          <FormControl className="w-full" isInvalid={passwordInvalid}>
            <FormControlLabel>
              <FormControlLabelText>Password</FormControlLabelText>
            </FormControlLabel>
            <Input size="lg">
              <InputField
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
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

          <FormControl className="w-full" isInvalid={genderInvalid}>
            <FormControlLabel>
              <FormControlLabelText>Gender</FormControlLabelText>
            </FormControlLabel>
            <Select onValueChange={(value) => setGender(value)}>
              <SelectTrigger variant="outline" size="lg">
                <SelectInput placeholder="Select option" />
                <SelectIcon className="mr-3" as={ChevronDownIcon} />
              </SelectTrigger>
              <SelectPortal>
                <SelectBackdrop />
                <SelectContent>
                  <SelectDragIndicatorWrapper>
                    <SelectDragIndicator />
                  </SelectDragIndicatorWrapper>
                  <SelectItem label="Male" value="male" />
                  <SelectItem label="Female" value="female" />
                </SelectContent>
              </SelectPortal>
            </Select>
            <FormControlError>
              <FormControlErrorIcon as={AlertCircleIcon} />
              <FormControlErrorText>{genderError}</FormControlErrorText>
            </FormControlError>
          </FormControl>
        </VStack>

        <VStack className="w-full my-7" space="lg">
          <Button className="w-full" onPress={handleSignUp} disabled={loading}>
            <ButtonText className="font-medium">
              {loading ? "Submiting..." : "Sign Up"}
            </ButtonText>
          </Button>
        </VStack>

        <HStack className="self-center" space="sm">
          <Text size="md" onPress={() => router.push("SignIn")}>
            Already have an account?
          </Text>
        </HStack>
      </VStack>
    </VStack>
  );
};

export default function SignUp() {
  return (
    <AuthLayout>
      <SignUpWithLeftBackground />
    </AuthLayout>
  );
}
