import { SongFile } from "@/services/types";
import { ArrowUpRight, FileText, GridNine } from "@phosphor-icons/react/dist/ssr";

export default function FileLink({ type, name, url}: SongFile) {
    return (
        <div onClick={() => window.open(url)} className="p-[10px] cursor-pointer flex gap-[10px] items-center rounded-full bg-white-medium text-white-extraDark">
            {type == "document" ? <FileText size={20} weight="thin" /> : <GridNine  size={20} weight="thin"/>}
            <p className="flex-1">{name}</p>
                <ArrowUpRight size={20} weight="thin" />
        </div>
    )
}