
import { FieldError, FieldValues, Path, RegisterOptions, UseFormRegister } from "react-hook-form";
import classes from "@/utils/classes";
import { ReactNode } from "react";
import { User } from "@phosphor-icons/react/dist/ssr/User"

interface InputProps<T extends FieldValues> extends React.InputHTMLAttributes<HTMLInputElement> {
    label: Path<T>,
    register: UseFormRegister<T>,
    error: FieldError | undefined,
    options?: RegisterOptions<T, Path<T>>,
    grow?: boolean,
    icon?: ReactNode | null
}

const Input = <T extends FieldValues,>({ label, register, grow, options, error, icon = <User weight="light" size={20} />, name, className, ...props }: InputProps<T>) => {
    return (
        <div className={classes("flex flex-col items-stretch gap-[6px]", grow ? "flex-1" : "")}>
            <label htmlFor={label} className="font-quicksand text-sm text-white-extraDark">{label}</label>
            <div className="flex items-center focus-within:outline focus-within:outline-1 focus-within:outline-white-black gap-[10px] p-[10px] bg-white-medium rounded-full">
                {icon}
                <input
                    id={label}
                    {...props}
                    {...register(label, options ?? {})}
                    className={
                        classes(
                            className ?? "",
                            "font-quicksand border-none bg-white-medium fill-none",
                            "focus:outline-none",
                            "flex-1"
                        )
                    }
                />
            </div>
            {error && <small className="text-red-600">{error.message}</small>}
        </div>
    )
}

export default Input;