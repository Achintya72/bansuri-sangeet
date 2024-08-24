"use client";

import Button from "@/components/button";
import Input from "@/components/input";
import { auth } from "@/services/firebase";
import { Password } from "@phosphor-icons/react/dist/ssr/Password";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useRouter } from "next/navigation";
import { Dispatch, SetStateAction, useState } from "react";
import { FieldValues, useForm } from "react-hook-form"

interface LoginForm extends FieldValues {
    Email: string,
    Password: string
}

interface LoginProps {
    changeFlow: Dispatch<SetStateAction<"login" | "create">>
}

export default function Login({ changeFlow }: LoginProps) {
    const [loading, changeLoading] = useState(false);
    const { register, handleSubmit, formState: { errors } } = useForm<LoginForm>({
        mode: "all",
        reValidateMode: "onBlur"
    });

    const onSubmit = async (data: LoginForm) => {
        try {
            changeLoading(true);
            const user = await signInWithEmailAndPassword(auth, data.Email, data.Password);
            changeLoading(false);

        } catch(error) {
            console.log(error);
        }
    
    }

    return (
        <>
            <h5>Log In</h5>
            <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-[400px] flex flex-col gap-[20px]">
                <Input<LoginForm>
                    options={{
                        required: { value: true, message: "This field is required" },
                        pattern: { value: /^[\w\-\.]+@([\w-]+\.)+[\w-]{2,}$/, message: "Invalid Email Format" }
                    }} label="Email" register={register} error={errors.Email} placeholder="joe@gmail.coms" />
                <Input<LoginForm>
                    label="Password"
                    options={{
                        required: { value: true, message: "This field is required" },
                        minLength: { value: 5, message: "Password must be at least 5 characters" }
                    }}
                    register={register}
                    error={errors.Password}
                    placeholder="*****"
                    type="password"
                    icon={<Password size={20} weight="light" />}
                />
                <Button loading={loading} type="submit">Log In</Button>
                <div className="flex gap-[10px] w-full items-center">
                    <hr className="flex-1" />
                    <small className="text-white-dark">OR</small>
                    <hr className="flex-1" />
                </div>
                <Button variant="secondary" onClick={() => changeFlow("create")}> Create Account</Button>
            </form>
        </>
    )
}