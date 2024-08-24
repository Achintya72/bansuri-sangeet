"use client";

import Button from "@/components/button";
import FileLink from "@/components/fileLink";
import KeyValuePair from "@/components/keyValue";
import SongStatusIndicator from "@/components/songStatusIndicator";
import DataContext from "@/services/context";
import { SongFile } from "@/services/types";
import { CaretLeft, PencilLine } from "@phosphor-icons/react/dist/ssr";
import { useParams, useRouter } from "next/navigation";
import { useContext, useLayoutEffect } from "react";

export default function SongPage() {
    const { songId } = useParams();
    const { songs, user } = useContext(DataContext);
    const router = useRouter();

    let song = (songs ?? []).find(s => s.id == songId);
    let studentSongDetails = (user?.songs ?? []).find(s => s.songId == songId);
    let songFiles: SongFile[] = song?.files ?? [];
    useLayoutEffect(() => {
        if (songs != null && song == undefined) {
            router.replace("/music-library");
        }
    }, [songs, song, router]);

    return (
        <main className="layout min-h-screen flex gap-[20px] mt-[150px]">
            <div className="flex-[5] flex flex-col gap-[20px]">
                <div onClick={() => router.back()} className="cursor-pointer flex gap-[10px] items-center text-white-extraDark">
                    <CaretLeft size={20} weight="regular" />
                    <p className="button">Back</p>
                </div>
                {songs == null ?
                    <h5 className="text-transparent loading-card bg-white-medium rounded-[10px]">Example Raag</h5>
                    :
                    <>
                        <div>
                            <h2>Raag</h2>
                            <h5>{song?.name ?? ""}</h5>
                        </div>
                        {song &&
                            <>
                                {studentSongDetails &&
                                    <>
                                        <div className="flex flex-col items-start gap-[5px]">
                                            <p className="text-white-extraDark">Status</p>
                                            <SongStatusIndicator status={studentSongDetails.status} />
                                        </div>
                                        <div className="flex flex-col gap-[5px]">
                                            <p className="text-white-extraDark">Notes</p>
                                            <p>{studentSongDetails.notes?.length ? studentSongDetails.notes : "No Notes"}</p>
                                        </div>
                                    </>
                                }
                                <div className="flex flex-col gap-[10px]">
                                    <KeyValuePair value={song?.aaroha ?? ""} label="Aaroha" icon="upRight" />
                                    <KeyValuePair value={song?.avroha ?? ""} label="Avroha" icon="downRight" />
                                    <KeyValuePair value={song?.vaadi ?? ""} label="Vaadi" icon="one" />
                                    <KeyValuePair value={song?.samvaadi ?? ""} label="Samvadi" icon="two" />
                                    <KeyValuePair value={song?.thaat ?? ""} label="Thaat" icon="squares" />
                                    <KeyValuePair value={song?.samay ?? ""} label="Samay" icon="clock" />
                                    <KeyValuePair value={song?.jaati ?? ""} label="Jaati" icon="hash" />

                                </div>
                            </>}
                    </>
                }
            </div>
            <div className="flex-[7] flex flex-col gap-[20px]">
                {songFiles.map(s => <FileLink  {...s} key={s.name} />)}
            </div>
            {user?.role === "admin" &&
                <div className="fixed z-50" style={{ right: "max(20px, calc(50vw - 720px))", bottom: "100px" }}>
                    <Button onClick={() => router.push(`/music-library/${songId}/edit`)} iconOnly type="submit" icon={<PencilLine size={35} weight="regular" />} ></Button>
                </div>

            }
        </main>
    )
}