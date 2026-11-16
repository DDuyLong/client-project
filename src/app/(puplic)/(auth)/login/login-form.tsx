"use client";

import authApiRequet from "@/apiRequest/auth";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { handleErrorApi } from "@/lib/utils";
import { LoginBodyType } from "@/schemaValidations/auth.schema";
import { useMutation } from "@tanstack/react-query";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";

export function LoginForm() {
  const useLoginForm = useMutation({
    mutationFn: authApiRequet.clientLogin,
  });

  const form = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const handleSubmitFormLogin = async (body: LoginBodyType) => {
    try {
      const result = await useLoginForm.mutateAsync(body);

      toast.success(result.payload.message);

      console.log(result);
    } catch (error) {
      handleErrorApi({
        error,
        setError: form.setError,
      });
    }
  };

  return (
    <Card className="w-full max-w-sm bg-background/90 shadow-2xl backdrop-blur-sm">
      <CardHeader className="flex flex-col items-center justify-center">
        <CardTitle>Login</CardTitle>
        <CardDescription>Restaurant Management System</CardDescription>
      </CardHeader>
      <CardContent>
        <form
          id="form-login"
          noValidate
          onSubmit={form.handleSubmit(handleSubmitFormLogin, (error) => {
            console.log(error);
          })}
        >
          <FieldGroup>
            <Controller
              name="email"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field>
                  <FieldLabel htmlFor="form-login-email">Email</FieldLabel>
                  <Input
                    id="form-login-email"
                    type="email"
                    required
                    placeholder="m@example.com"
                    {...field}
                  />
                  {fieldState.error && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            <Controller
              name="password"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field>
                  <FieldLabel htmlFor="form-login-password">
                    Password
                  </FieldLabel>
                  <Input
                    id="form-login-password"
                    type="password"
                    required
                    {...field}
                  />
                  {fieldState.error && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
          </FieldGroup>
        </form>
      </CardContent>
      <CardFooter className="flex-col gap-2">
        <Button type="submit" form="form-login" className="w-full">
          Login
        </Button>
        <Button variant="outline" className="w-full" type="button">
          Login with Google
        </Button>
      </CardFooter>
    </Card>
  );
}
