"use client";

import classes from "@/utils/classes";
import { ButtonHTMLAttributes, FC, ReactNode } from "react";
import Loader from "./loader";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    icon?: ReactNode | null,
    children?: ReactNode,
    iconOnly?: boolean,
    variant?: "primary" | "secondary"
    selected?: boolean,
    toggleSelect?: Function,
    loading?: boolean
}

const Button: FC<ButtonProps> = ({ loading = false, icon = null, children = null, onClick = () => { }, iconOnly = false, variant = "primary", selected = false, toggleSelect = null }) => {
    return (
        <button
            onClick={(e) => {
                toggleSelect && toggleSelect();
                onClick && onClick(e);
            }}
            className={classes(
                iconOnly ? "p-[10px]" : "px-[20px] py-[10px]",
                selected ? "bg-white-extraDark text-white-light" :
                    (variant == "primary" ? "bg-orange-regular text-white-black" : "bg-white-dark text-white-black"),
                "flex gap-[10px] items-center button rounded-full justify-center"
            )}>
            {loading ?
                <Loader />
                :
                <>
                    {children}
                    {icon}

                </>}
        </button>
    )
}


export default Button;
