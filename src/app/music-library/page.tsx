"use client";

import { db } from "@/services/firebase";
import { Song } from "@/services/types";
import { collection, getDocs } from "firebase/firestore";
import { useContext, useEffect, useState } from "react";
import MusicCard from "@/components/musicCard";
import LoadingCard from "./loadingCard";
import { MagnifyingGlass, Plus } from "@phosphor-icons/react/dist/ssr";
import classes from "@/utils/classes";
import DataContext from "@/services/context";
import Button from "@/components/button";
import { useRouter } from "next/navigation";

export default function MusicLibrary() {
    const { user, songs } = useContext(DataContext);
    const [search, changeSearch] = useState("");
    const [group, changeGroup] = useState<"All" | "Starred">("All");
    const router = useRouter();

    let songsToShow = (songs ?? []).filter(s => s.name?.toLowerCase().indexOf(search.trim().toLowerCase()) != -1);
    if (user && group == "Starred") {
        songsToShow = songsToShow.filter(s => (user.starredSongs ?? []).find(a => a.songId == s.id));
    }

    return (
        <main className="min-h-screen layout mt-[150px]">
            <div className="flex items-center gap-[20px]">
                <h3 className="flex-1">Music Library</h3>
                <div className="relative flex gap-[20px] ">
                    <p
                        className={
                            classes(
                                "button z-0 px-[10px] py-[5px] rounded-[5px] transition-all duration-200",
                                "text-transparent bg-orange-light absolute",
                                group == "Starred" ? "right-0" : ""
                            )
                        }
                    >{group}</p>
                    <p
                        className={
                            classes(
                                "cursor-pointer relative z-10 button",
                                "px-[10px] py-[5px]",
                                group == "All" ? "text-orange-extraDark" : "text-white-dark"
                            )
                        }
                        onClick={() => changeGroup("All")}
                    >All</p>
                    <p
                        className={
                            classes(
                                "cursor-pointer button relative z-10 px-[10px] py-[5px]",
                                group == "Starred" ? "text-orange-extraDark" : "text-white-dark"
                            )
                        }
                        onClick={() => changeGroup("Starred")}
                    >Starred</p>
                </div>
                <div className="relative">
                    <input
                        placeholder="Search by Name"
                        value={search}
                        onChange={(e) => changeSearch(e.target.value)}
                        className="py-[10px] focus:outline-none focus:border-white-black focus:border 
                                    !focus:outline-white-black font-quicksand pl-[40px] pr-[10px] rounded-full text-white-black bg-white-medium"
                    />
                    <div className="absolute left-[10px] text-white-extraDark top-[50%] translate-y-[-50%]">
                        <MagnifyingGlass size={20} weight="regular" />
                    </div>
                </div>
            </div>
            <div className="grid grid-cols-4 mt-[40px] gap-[20px]">
                {songs == null ?
                    <>
                        <LoadingCard />
                        <LoadingCard />
                    </> : songsToShow.map(song => (
                        <MusicCard song={song} key={song.id} />
                    ))}
            </div>
            {user?.role == "admin" &&
                <div className="fixed z-50" style={{ right: "max(20px, calc(50vw - 720px))", bottom: "100px" }}>
                    <Button iconOnly onClick={() => router.push("/music-library/createNew")} icon={<Plus size={35} weight="regular" />} ></Button>
                </div>
            }

        </main>
    )
}