"use client";

import Button from "@/components/button";
import Input from "@/components/input";
import DataContext from "@/services/context";
import { db } from "@/services/firebase";
import { Song, SongFile } from "@/services/types";
import classes from "@/utils/classes";
import { ArrowDownRight, ArrowUpRight, CaretLeft, Check, Clock, FileText, GridNine, HashStraight, Link, NumberSquareOne, NumberSquareTwo, PencilLine, PlusCircle, SquaresFour, Trash } from "@phosphor-icons/react/dist/ssr";
import { doc, setDoc } from "firebase/firestore";
import { useRouter } from "next/navigation";
import { ChangeEvent, Dispatch, SetStateAction, useContext, useEffect, useState } from "react";
import { FieldValues, useForm } from "react-hook-form";

interface SongForm extends FieldValues {
    Name: string,
    Aaroha: string,
    Avroha: string,
    Thaat: string,
    Samay: string,
    Jaati: string,
    Vaadi: string,
    Samvaadi: string
};

export default function CreateNewSong() {
    const { songs } = useContext(DataContext);
    const [files, changeFiles] = useState<SongFile[]>([]);
    const { register, handleSubmit, formState: { errors } } = useForm<SongForm>({
        mode: "all",
        reValidateMode: "onBlur"
    });
    const router = useRouter();

    const addFile = () => {
        let newFiles = [...files, {
            name: "",
            type: "sheet",
            url: ""
        } as SongFile];
        changeFiles(newFiles);
    }


    const quit = () => {
        let confirmation = window.confirm("Want to discard all changes?");
        if (confirmation) {
            router.back();
        }
    }

    const onSubmit = async (values: SongForm) => {
        try {
            await setDoc(doc(db, "music", "raag_" + values.Name.toLowerCase().split(" ").join("_")), {
                aaroha: values.Aaroha,
                avroha: values.Avroha,
                files: files,
                jaati: values.Jaati,
                name: values.Name,
                samay: values.Samay,
                samvaadi: values.Samvaadi,
                thaat: values.Thaat,
                vaadi: values.Vaadi
            } as Song, { merge: true });
            router.back();
        } catch(e) {
            console.log(e);
        }
    }

    return (
        <main className="layout min-h-screen flex gap-[20px] mt-[150px]">
            <div className="flex-[7] flex flex-col items-stretch gap-[20px]">
                <div onClick={quit} className="cursor-pointer flex gap-[10px] items-center text-white-extraDark">
                    <CaretLeft size={20} weight="regular" />
                    <p className="button">Cancel</p>
                </div>
                <h1>Add Raag</h1>
                <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-2 gap-[10px] items-stretch">
                    <Input<SongForm>
                        label="Name"
                        register={register}
                        options={{
                            required: "Field is required",
                            validate: (value: string) => {
                                let s = (songs ?? []).find(s => s.name?.toLowerCase() == value.toLowerCase());
                                if (s != undefined) {
                                    return "Raag already exists"
                                }
                            }
                        }}
                        error={errors.Name}
                        icon={<PencilLine weight="light" size={20} />}
                        placeholder="Yaman"
                    />
                    <Input<SongForm>
                        label="Aaroha"
                        register={register}
                        options={{ required: "Field is required" }}

                        error={errors.Aaroha}
                        icon={<ArrowUpRight weight="light" size={20} />}
                        placeholder="S R G M P D N S'"
                    />
                    <Input<SongForm>
                        label="Avroha"
                        register={register}
                        error={errors.Avroha}
                        options={{ required: "Field is required" }}

                        icon={<ArrowDownRight weight="light" size={20} />}
                        placeholder="S' N D P M G R S"
                    />
                    <Input<SongForm>
                        label="Vaadi"
                        register={register}
                        error={errors.Vaadi}
                        options={{ required: "Field is required" }}

                        icon={<NumberSquareOne weight="light" size={20} />}
                        placeholder="Nishad"
                    />
                    <Input<SongForm>
                        label="Samvaadi"
                        register={register}
                        error={errors.Samvaadi}
                        options={{ required: "Field is required" }}

                        icon={<NumberSquareTwo weight="light" size={20} />}
                        placeholder="Gandhar"
                    />
                    <Input<SongForm>
                        label="Thaat"
                        register={register}
                        error={errors.Thaat}
                        options={{ required: "Field is required" }}

                        icon={<SquaresFour weight="light" size={20} />}
                        placeholder="Kalyan"
                    />
                    <Input<SongForm>
                        label="Samay"
                        register={register}
                        error={errors.Samay}
                        options={{ required: "Field is required" }}

                        icon={<Clock weight="light" size={20} />}
                        placeholder="1st Prahar of Night"
                    />
                    <Input<SongForm>
                        label="Jaati"
                        register={register}
                        error={errors.Jaati}
                        options={{ required: "Field is required" }}
                        icon={<HashStraight weight="light" size={20} />}
                        placeholder="Sampurna-Sampurna"
                    />
                    <div className="fixed z-50" style={{ right: "max(20px, calc(50vw - 720px))", bottom: "100px" }}>
                        <Button iconOnly type="submit" icon={<Check size={35} weight="regular" />} ></Button>
                    </div>
                </form>
            </div>
            <div className="flex-[5] flex flex-col items-stretch gap-[20px]">
                <p className="button text-white-extraDark">Files</p>
                {files.map((f, i) =>
                    <FileInput {...f} files={files} index={i} changeFiles={changeFiles} key={i} />
                )}
                <Button onClick={addFile} variant="secondary" icon={<PlusCircle size={20} weight="regular" />}>Add</Button>
            </div>
        </main>
    )
}

interface FileInputProps extends SongFile {
    changeFiles: Dispatch<SetStateAction<SongFile[]>>,
    index: number,
    files: SongFile[]
}

interface FileForm extends FieldValues {
    Name: string,
    Url: string
}

const FileInput = ({ type, files, name, url, index, changeFiles }: FileInputProps) => {
    const { register, handleSubmit, watch, formState: { errors } } = useForm<FileForm>({
        mode: "all",
        reValidateMode: "onBlur",
        defaultValues: {
            Name: name,
            Url: url
        }
    });

    const changeFileType = (t: "document" | "sheet") => {
        changeFiles(prev => {
            prev[index].type = t;
            return [...prev];
        })
    }

    const deleteSong = () => {
        let newFiles = files;
        newFiles.splice(index, 1);
        changeFiles([...newFiles]);
    }

    useEffect(() => {
        let sub = watch((value) => {
            changeFiles(prev => {
                prev[index] = { ...prev[index], name: value.Name, url: value.Url };
                return [...prev];
            })
        })
        return sub.unsubscribe;
    }, [watch])


    return (
        <form className="flex flex-col items-stretch gap-[10px]">
            <div className="flex gap-[20px]">
                <Input<FileForm>
                    label="Name"
                    grow
                    options={{ required: "Field is required" }}
                    error={errors.Name}
                    register={register}
                    placeholder="Alaap"
                    icon={<PencilLine size={20} weight="thin" />}
                />
                <div className="flex flex-col gap-[6px]">
                    <p className="text-sm text-white-extraDark">File Type</p>
                    <div className="flex relative p-[2px] bg-white-medium rounded-full">
                        <div
                            onClick={() => changeFileType("document")}
                            className={
                                classes(
                                    "cursor-pointer relative z-10",
                                    "p-[10px] rounded-full",
                                    type == "document" ? "text-white-black" : "text-white-dark"
                                )}
                        >
                            <FileText size={20} weight="thin" />
                        </div>
                        <div
                            onClick={() => changeFileType("sheet")}
                            className={
                                classes(
                                    "cursor-pointer relative z-10",
                                    "p-[10px] rounded-full",
                                    type == "sheet" ? "text-white-black" : "text-white-dark"
                                )
                            }
                        >
                            <GridNine size={20} weight="thin" />
                        </div>
                        <div
                            className={
                                classes(
                                    "z-0 w-[40px] h-[40px] bg-white-light",
                                    "rounded-full absolute transition-all",
                                    type == "document" ? "" : "translate-x-[100%]"
                                )
                            }
                        />
                    </div>
                </div>
            </div>
            <div className="flex gap-[10px] items-end">
                <Input<FileForm>
                    label="Url"
                    error={errors.Url}
                    type="url"
                    register={register}
                    options={{
                        required: "This field is required",
                        validate: (val: string) => {
                            let url;
                            try {
                                url = new URL(val);
                            } catch (e) {
                                return "Not a valid URL"
                            }
                            return (url.protocol !== "http:" && url.protocol !== "https:") && "Not a valid URL"
                        }
                    }}
                    placeholder="https://www.google.com"
                    grow
                    icon={<Link size={20} weight="thin" />}
                />
                <div onClick={deleteSong} className="cursor-pointer bg-white-medium p-[12px] rounded-full">
                    <Trash size={20} weight="thin" />
                </div>
            </div>
        </form>
    )
}