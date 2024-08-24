"use client"

import { SongFile } from "@/services/types";
import { Dispatch, SetStateAction, useEffect } from "react";
import { FieldValues, useForm } from "react-hook-form";
import Input from "./input";
import { PencilLine } from "@phosphor-icons/react/dist/ssr/PencilLine";
import classes from "@/utils/classes";
import { FileText } from "@phosphor-icons/react/dist/ssr/FileText";
import { GridNine } from "@phosphor-icons/react/dist/ssr/GridNine";
import { Link } from "@phosphor-icons/react/dist/ssr/Link";
import { Trash } from "@phosphor-icons/react/dist/ssr/Trash";

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
    }, [watch, changeFiles, index])


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

export default FileInput;