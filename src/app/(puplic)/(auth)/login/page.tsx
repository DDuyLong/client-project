import { LoginForm } from "@/app/(puplic)/(auth)/login/login-form";
import Image from "next/image";
import React from "react";

export default function Login() {
  return (
    <div className="flex min-h-screen items-center justify-center ">
      <LoginForm />
    </div>
  );
}
