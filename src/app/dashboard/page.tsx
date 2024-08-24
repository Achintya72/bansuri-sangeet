"use client";

import Button from "@/components/button";
import MusicCard from "@/components/musicCard";
import DataContext from "@/services/context";
import classes from "@/utils/classes";
import { hoursToString } from "@/utils/timeFormatting";
import { Check, Coins } from "@phosphor-icons/react/dist/ssr";
import { useRouter } from "next/navigation";
import { useContext, useLayoutEffect } from "react";

export default function Dashboard() {
    const { user, populated, songs } = useContext(DataContext);
    const router = useRouter();

    useLayoutEffect(() => {
        if (populated == false) {
            router.replace("/login");
        }
    }, [user, populated, router]);

    const sendRequest = () => {
        
    }

    const songLibrary = (songs ?? []).filter(s => (user?.songs ?? []).find(a => a.songId == s.id) != undefined);

    return (
        <main className="layout min-h-screen ">
            <div className="flex items-center mt-[150px]">
                <div className="flex-1">
                    <p className="text-white-extraDark">Welcome,</p>
                    <h5>{user?.name ?? "User"}</h5>
                </div>
                <div className="p-[20px] rounded-[20px] bg-white-medium flex gap-[20px] items-start">
                    <div>
                        <p>Unpaid Classes</p>
                        <h6 className={classes((user?.paymentReminder ?? false) ? "text-orange-extraDark" : "text-white-black")}>{hoursToString(user?.unpaidClasses ?? 0)}</h6>
                    </div>
                    {(user?.paymentRequestSent ?? false) ?
                        <Button selected={true} icon={<Check size={20} weight="thin" />}>Request Sent</Button>
                        : <Button icon={<Coins size={20} weight="thin" />}>I Paid</Button>
                    }
                </div>
            </div>
            <div className="flex gap-[20px] overflow-x-auto mt-[20px]">
                {songLibrary.map(song => (
                    <MusicCard song={song} key={song.id} showNotes />
                ))}
            </div>
        </main>
    )
}