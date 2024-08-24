"use client";

import SongStatusIndicator from "@/components/songStatusIndicator";
import DataContext from "@/services/context"
import { db } from "@/services/firebase";
import { Song, StudentSong } from "@/services/types"
import classes from "@/utils/classes";
import { Backpack, Check, Paperclip, Star } from "@phosphor-icons/react/dist/ssr"
import { arrayRemove, arrayUnion, doc, updateDoc } from "firebase/firestore";
import { useRouter } from "next/navigation";
import { useContext } from "react"

interface CardProps {
    song: Song,
    showNotes?: boolean
}

export default function MusicCard({ song, showNotes = false }: CardProps) {
    const { user, loggedIn } = useContext(DataContext);
    const router = useRouter();
    const starred = (user?.starredSongs ?? []).find(s => s.songId == song.id);
    const inHistory = (user?.songs ?? []).find(s => s.songId == song.id);

    const toggleLike = () => {
        const songDetails: StudentSong = {
            notes: inHistory?.notes ?? "",
            songId: song.id,
            status: inHistory?.status ?? "unset"
        };
        if (starred != undefined) {
            updateDoc(doc(db, "users", user?.uid ?? ""), {
                starredSongs: arrayRemove(starred)
            });
        } else {
            updateDoc(doc(db, "users", user?.uid ?? ""), {
                starredSongs: arrayUnion(songDetails)
            });
        }
    }

    return (
        <div className="min-w-[200px] relative">
            {loggedIn &&
                <div
                    onClick={toggleLike}
                    className={classes(
                        starred ? "text-orange-regular" : "text-white-dark",
                        "absolute cursor-pointer right-[20px] z-10 top-[20px]"
                    )}>
                    <Star size={20} weight="fill" />
                </div>
            }
            <div onClick={() => router.push(`/music-library/${song.id}`)} className=" cursor-pointer relative p-[20px] bg-white-medium rounded-[20px] bg=white-medium flex flex-col  gap-[10px] ">

                <div>
                    <p>Raag</p>
                    <h6>{song?.name}</h6>
                </div>
                <div className="flex gap-[10px] items-center">
                    <Paperclip size={20} />
                    <p>{song.files?.length ?? 0} files</p>
                </div>
                <div className="flex flex-col items-start">

                    {inHistory && <SongStatusIndicator status={inHistory.status} />}
                </div>
                {inHistory && showNotes &&
                    <div>
                        <p className="button">Notes</p>
                        <p>{inHistory.notes}</p>
                    </div>
                }
            </div>
        </div>
    )
}

