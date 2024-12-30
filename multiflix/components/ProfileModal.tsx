import React from "react";
import {
  Modal,
  ModalBackdrop,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
} from "@/components/ui/modal";
import {
  Avatar,
  AvatarBadge,
  AvatarImage,
  AvatarFallbackText,
} from "@/components/ui/avatar";
import { Button, ButtonText } from "./ui/button";
import { Heading } from "./ui/heading";
import { Icon, CloseIcon } from "./ui/icon";
import { Text } from "./ui/text";
import { VStack } from "./ui/vstack";
import { Center } from "./ui/center";
import { useRouter } from "expo-router";
import { useAuth } from "@/context/AuthContext";

type ProfileModalProps = {
  modelOpen: boolean;
  setModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function ProfileModal({
  modelOpen,
  setModalOpen,
}: ProfileModalProps) {
  const { user, logout } = useAuth();
  return (
    <Modal
      isOpen={modelOpen}
      onClose={() => {
        setModalOpen(false);
      }}
      size="md"
    
    >
        
      <ModalBackdrop />
      <ModalContent>
      <VStack className="justify-center items-center">
        <Avatar size="xl" className="mb-4 bg-indigo-300 border-2 border-indigo-600">
          <AvatarFallbackText>{user?.name}</AvatarFallbackText>
          <AvatarBadge />
        </Avatar>

          <Heading size="md" className="text-typography-950">
            {user?.name}
          </Heading>

          <Text style={{textAlign: "center"}} size="sm" className="text-typography-500 align-center">
            {user?.username}
          </Text>
          <Text style={{textAlign: "center"}} size="sm" className="text-typography-500 mb-4">
            {user?.email}
          </Text>

        <ModalFooter>
          <Button
            variant="outline"
            action="secondary"
            onPress={() => {
              setModalOpen(false);
            }}
          >
            <ButtonText>Cancel</ButtonText>
          </Button>
          <Button
            onPress={() => {
              setModalOpen(false);
              logout();
            }}
            action="negative"
          >
            <ButtonText>Logout</ButtonText>
          </Button>
        </ModalFooter>
        </VStack>
      </ModalContent>
    
    </Modal>
  );
}
