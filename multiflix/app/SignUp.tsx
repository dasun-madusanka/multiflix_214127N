import React from "react";
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
} from "@/components/ui/form-control";
import { Pressable } from "@/components/ui/pressable";
import { Input, InputField } from "@/components/ui/input";
import { ChevronDownIcon } from "@/components/ui/icon";
import { Button, ButtonText, ButtonIcon } from "@/components/ui/button";
import { Icon } from "@/components/ui/icon";
import Link from "@unitools/link";
import { ArrowLeftIcon, CheckIcon } from "@/components/ui/icon";
import { AuthLayout } from "@/app/AuthLayout";

const SignUpWithLeftBackground = () => {
  return (
    <VStack className="max-w-[440px] w-full" space="md">
      <VStack className="md:items-center" space="md">
        <Pressable>
          <Icon
            as={ArrowLeftIcon}
            className="md:hidden text-background-800"
            size="xl"
          />
        </Pressable>
        <VStack>
          <Text className="md:text-center" size="3xl">
            Sign up
          </Text>
          <Text>Create an account to start using gluestack</Text>
        </VStack>
      </VStack>

      <VStack className="w-full">
        <VStack space="xl" className="w-full">
          <FormControl className="w-full">
            <FormControlLabel>
              <FormControlLabelText>Name</FormControlLabelText>
            </FormControlLabel>
            <Input>
              <InputField placeholder="Enter your name" />
            </Input>
          </FormControl>

          <FormControl className="w-full">
            <FormControlLabel>
              <FormControlLabelText>Username</FormControlLabelText>
            </FormControlLabel>
            <Input>
              <InputField placeholder="Enter a username" />
            </Input>
          </FormControl>

          <FormControl className="w-full">
            <FormControlLabel>
              <FormControlLabelText>Email</FormControlLabelText>
            </FormControlLabel>
            <Input>
              <InputField placeholder="Enter your email" />
            </Input>
          </FormControl>

          <FormControl className="w-full">
            <FormControlLabel>
              <FormControlLabelText>Password</FormControlLabelText>
            </FormControlLabel>
            <Input>
              <InputField type="password" placeholder="Enter your password" />
            </Input>
          </FormControl>

          <FormControl className="w-full">
            <FormControlLabel>
              <FormControlLabelText>Gender</FormControlLabelText>
            </FormControlLabel>
            <Select>
              <SelectTrigger variant="outline" size="md">
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
          </FormControl>
        </VStack>

        <VStack className="w-full my-7" space="lg">
          <Button className="w-full">
            <ButtonText className="font-medium">Sign up</ButtonText>
          </Button>
        </VStack>

        <HStack className="self-center" space="sm">
          <Text size="md">Already have an account?</Text>
          <Link href="/auth/login">
            <LinkText
              className="font-medium text-primary-700 group-hover/link:text-primary-600  group-hover/pressed:text-primary-700"
              size="md"
            >
              Log in
            </LinkText>
          </Link>
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
