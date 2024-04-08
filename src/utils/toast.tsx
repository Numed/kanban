import { useToast } from "@chakra-ui/react";

export const useCustomToast = () => {
  const toast = useToast();

  const showToast = (
    message: string,
    status: "success" | "error" | "warning" | "info"
  ) => {
    toast({
      position: "bottom-right",
      title: message,
      status,
      duration: 5000,
      isClosable: true,
    });
  };

  return { showToast };
};
