import authApiRequet from "@/apiRequest/auth";
import { useMutation } from "@tanstack/react-query";

const useLoginMutation = () => {
  return useMutation({
    mutationFn: authApiRequet.clientLogin,
  });
};
