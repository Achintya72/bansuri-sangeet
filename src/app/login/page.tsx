"use client";

import Input from "@/components/input"
import { FieldValues, useForm } from "react-hook-form"
import { Password } from "@phosphor-icons/react/dist/ssr/Password"
import Button from "@/components/button";
import Login from "./login";
import { useState } from "react";
import CreateAccount from "./create";

interface LoginForm extends FieldValues {
    Email: string,
    Password: string
}

export default function LoginScreen() {
    const [flow, changeFlow] = useState<"login" | "create">("login");
    return (
        <main className="h-screen layout flex flex-col items-start justify-center">
            {flow == "login" ? <Login changeFlow={changeFlow} /> : <CreateAccount changeFlow={changeFlow}/>}
        </main>
    )
}