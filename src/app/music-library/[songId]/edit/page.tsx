"use client";

import Button from "@/components/button";
import FileInput from "@/components/fileInput";
import Input from "@/components/input";
import DataContext from "@/services/context";
import { db } from "@/services/firebase";
import { Song, SongFile } from "@/services/types";
import classes from "@/utils/classes";
import { ArrowDownRight, ArrowUpRight, CaretLeft, Check, Clock, FileText, GridNine, HashStraight, Link, NumberSquareOne, NumberSquareTwo, PencilLine, PlusCircle, SquaresFour, Trash } from "@phosphor-icons/react/dist/ssr";
import { doc, setDoc } from "firebase/firestore";
import { useParams, usePathname, useRouter } from "next/navigation";
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
    const { songId } = useParams();
    let song = songs?.find(s => s.id === songId); 
    const [files, changeFiles] = useState<SongFile[]>(song?.files ?? []);

    useEffect(() => {
        let s = songs?.find(s => s.id === songId); 
        changeFiles(s?.files ?? []);
    }, [songs, songId]);

    const { register, handleSubmit, formState: { errors } } = useForm<SongForm>({
        mode: "all",
        reValidateMode: "onBlur",
        defaultValues: {
            Name: song?.name,
            Aaroha: song?.aaroha,
            Avroha: song?.avroha,
            Jaati: song?.jaati,
            Samay: song?.samay,
            Samvaadi: song?.samvaadi,
            Thaat: song?.thaat,
            Vaadi: song?.vaadi
        }
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
            await setDoc(doc(db, "music", song?.id ?? ("raag_" + values.Name.toLowerCase().split(" ").join("_"))), {
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
        } catch (e) {
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
                <h1>Edit Raag</h1>
                <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-2 gap-[10px] items-stretch">

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