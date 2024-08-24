"use client";

import { useRouter } from "next/navigation";
import Button from "./button";
import Link from "next/link";
import { useContext, useState } from "react";
import DataContext from "@/services/context";
import { signOut } from "firebase/auth";
import { auth } from "@/services/firebase";

export default function Navbar() {
    const router = useRouter();
    const { loggedIn } = useContext(DataContext);
    const [loading, changeLoading] = useState(false);

    const logOut = async () => {
        changeLoading(true);
        await signOut(auth);
        changeLoading(false);
    } 

    return (
        <nav className="fixed z-50 w-full top-0 bg-white-light py-[25px]">
            <div className="w-full max-w-[1480px] items-center gap-[20px] mx-auto px-[20px] flex">
                <h4 className="flex-1 cursor-pointer" onClick={() => router.push("/")}>Sync</h4>
                {loggedIn && <p className="cursor-pointer" onClick={() => router.push("/dashboard")}>Dashboard</p>}
                <p className="cursor-pointer" onClick={() => router.push("/music-library")}>Music Library</p>
                {!loggedIn ?
                    <Button onClick={() => router.push("/login")}>Log In</Button>
                    :
                    <Button loading={loading} onClick={logOut}>Log Out</Button>
                }
            </div>
        </nav>
    )
}