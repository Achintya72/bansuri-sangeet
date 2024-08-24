import Button from "@/components/button";
import Input from "@/components/input";
import { defaultUser } from "@/services/defaultObjs";
import { auth, db } from "@/services/firebase";
import { Profile } from "@/services/types";
import { EnvelopeSimple } from "@phosphor-icons/react/dist/ssr";
import { Password } from "@phosphor-icons/react/dist/ssr/Password";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { Dispatch, SetStateAction } from "react";
import { FieldValues, useForm } from "react-hook-form";

interface LoginProps {
    changeFlow: Dispatch<SetStateAction<"login" | "create">>
}

interface CreateForm extends FieldValues {
    Email: string,
    Password: string,
    "Confirm Password": string,
    Name: string
}


export default function CreateAccount({ changeFlow }: LoginProps) {
    const { register, handleSubmit, formState: { errors } } = useForm<CreateForm>({
        mode: "all",
        reValidateMode: "onBlur"
    });

    const onSubmit = async (data: CreateForm) => {
        try {
            const user = await createUserWithEmailAndPassword(auth, data.Email, data.Password);
            let userObj: Profile = {
                ...defaultUser,
                uid: user.user.uid,
                email: user.user.email ?? "",
                name: data.Name,
                joinDate: new Date(),
            };
            await setDoc(doc(db, "users", user.user.uid), {
                ...userObj
            }, {merge: true });

        } catch(err) {
            console.log(err);
        }

    }

    return (
        <>
            <h5>Create Account</h5>
            <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-[400px] flex flex-col gap-[20px]">
                <Input<CreateForm>
                    label="Name"
                    placeholder="John"
                    type="text"
                    grow
                    autoComplete="given-name"
                    name="name"
                    register={register}
                    error={errors.Name}
                    options={{
                        required: { value: true, message: "This field is required " },
                    }}
                />
                <Input<CreateForm>
                    options={{
                        required: { value: true, message: "This field is required" },
                        pattern: { value: /^[\w\-\.]+@([\w-]+\.)+[\w-]{2,}$/, message: "Invalid Email Format" }
                    }} 
                    label="Email" 
                    register={register} 
                    error={errors.Email} 
                    placeholder="joe@gmail.com" 
                    icon={<EnvelopeSimple size={20} weight="light" />}
                    />
                <Input<CreateForm>
                    label="Password"
                    options={{
                        required: { value: true, message: "This field is required" },
                        validate: (value: string) => {
                            if (value.length < 6) {
                                return "Password must be atleast 6 characters long"
                            }
                            let chars = Array.from(value);
                            if (!chars.some(char => /[A-Z]/.test(char))) return "Password must have at least one uppercase letter";
                            if (!chars.some(char => /[a-z]/.test(char))) return "Password must have at least one lowercase letter";
                            if (!chars.some(char => /[1-9]/.test(char))) return "Password must have atleast one numerical digit";
                            if (!chars.some(char => /[!@#$%^&*(),.?":{}|<>]/.test(char))) return "Password must have atleast one of [!@#$%^&*(),.?\":{}|<>]";
                        }
                    }}
                    register={register}
                    error={errors.Password}
                    placeholder="*****"
                    type="password"
                    icon={<Password size={20} weight="light" />}
                />
                <Input<CreateForm>
                    label="Confirm Password"
                    options={{
                        required: { value: true, message: "This field is required" },
                        validate: (val: string, formValues) => {
                            if (val !== formValues.Password) return "Passwords must match"
                        }
                    }}
                    register={register}
                    error={errors["Confirm Password"]}
                    placeholder="*****"
                    type="password"
                    icon={<Password size={20} weight="light" />}
                />
                <Button type="submit">Create Account</Button>
                <div className="flex gap-[10px] w-full items-center">
                    <hr className="flex-1" />
                    <small className="text-white-dark">OR</small>
                    <hr className="flex-1" />
                </div>
                <Button variant="secondary" onClick={() => changeFlow("login")}>Use Existing Account</Button>
            </form>
        </>
    )
}