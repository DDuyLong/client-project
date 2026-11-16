/* eslint-disable @typescript-eslint/no-explicit-any */
import { EntityError } from "@/lib/http";
import { UseFormSetError } from "react-hook-form";
import { toast } from "sonner";

export { cn } from "cn";

// xóa ký tự đầu tiên của path
export const normalizePath = (path: string) => {
  return path.startsWith("/") ? path.slice(1) : path;
};

export const handleErrorApi = ({
  error,
  setError,
  duration,
}: {
  error: any;
  setError?: UseFormSetError<any>;
  duration?: number;
}) => {
  if (error instanceof EntityError && setError) {
    error.payload.errors.forEach((item) => {
      setError(item.field, {
        type: "server",
        message: item.message,
      });
    });
  } else {
    toast.error("Lỗi", {
      description: error?.payload?.message ?? "Lỗi không xác định",
      duration: duration ?? 5000,
    });
  }
};
