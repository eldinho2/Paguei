"use client";
import { Loader } from "lucide-react";
import AuthWithGoogle from "@/components/AuthWithGoogle";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import * as React from "react";
import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

const schema = z.object({
  email: z.string().email({ message: "Email inválido" }),
  password: z
    .string()
    .min(6, { message: "A senha deve ter no mínimo 6 caracteres" })
    .max(16, { message: "A senha deve ter no máximo 16 caracteres" }),
});

type Inputs = z.infer<typeof schema>;

type LoginProps = {
  method: "signIn" | "signUp";
};

export default function Login() {
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });

  const onSubmit = (data: Inputs) => {
    setIsLoading(true);
    console.log(data);
  };

  const Login = ({ method }: LoginProps) => {
    return (
      <Card className="mx-auto bg-black text-white border-white/20">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl fade-in">{
            method === "signIn" ? "Login" : "Registrar"
          }</CardTitle>
          <CardDescription className="text-white/60 fade-in-100">
            {
              method === "signIn" ? "Entre com sua conta" : "Crie uma conta"
            }
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          <div className="flex justify-center items-center">
            <div className="border-b flex-1 border-white/20" />
            <div className="">
              <span className="px-2">Ou continue com</span>
            </div>
            <div className="border-b flex-1 border-white/20" />
          </div>
          <div className="flex items-center justify-center border-2 p-2 rounded-sm border-white/50">
            <AuthWithGoogle />
          </div>
          <div className="border-b flex-1 pt-2 border-white/20" />
          <form
            className="grid gap-2 text-white"
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className="grid gap-2 fade-up">
              <Label htmlFor="email">Email</Label>
              <Input
                {...register("email")}
                id="email"
                type="email"
                placeholder="email@email.com"
                className="text-black border-white/20"
              />
              {errors.email?.message && <p>{errors.email?.message ?? ""}</p>}
            </div>
            <div className="grid gap-2 fade-up ">
              <Label htmlFor="password">Senha</Label>
              <Input
                {...register("password")}
                id="password"
                type="password"
                placeholder="Senha"
                className="text-black border-white/20"
              />
              {errors.password?.message && (
                <p>{errors.password?.message ?? ""}</p>
              )}
            </div>
            <div className="w-full grid mt-2">
              <button
                type="submit"
                className="flex justify-center bg-black p-2 rounded-sm border-2 border-white/50 transition duration-500 ease-in-out  active:border-black/35"
              >
                {isLoading ? (
                  <Loader className="text-white animate-spin-slow" />
                ) : (
                  method === "signIn" ? "Entrar" : "Criar conta"
                )}
              </button>
            </div>
          </form>
        </CardContent>
      </Card>
    );
  };

  return (
      <Tabs defaultValue="signUp" className="w-[310px]">
        <TabsList className="bg-black flex justify-evenly rounded-lg border-2">
          <TabsTrigger className="text-white/50" value="signUp">Registrar</TabsTrigger>
          <TabsTrigger className="text-white/50" value="signIn">Login</TabsTrigger>
        </TabsList>
        <TabsContent value="signIn">
          <Login method="signIn" />
        </TabsContent>
        <TabsContent value="signUp">
          <Login method="signUp" />
        </TabsContent>
      </Tabs>
  );
}
