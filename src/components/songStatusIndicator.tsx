import classes from "@/utils/classes"
import { Check } from "@phosphor-icons/react/dist/ssr"
import { Backpack } from "@phosphor-icons/react/dist/ssr/Backpack"

interface SongStatusIndicatorProps {
    status: "completed" | "assigned" | "unset" | undefined
}

const SongStatusIndicator = ({ status = "unset" }: SongStatusIndicatorProps) => {
    return (
        <>
            {status != "unset" &&

                <div className={classes(
                    "flex gap-[10px] items-center px-[12px] py-[6px] rounded-full",
                    status == "completed" ? "bg-green-light text-green-extraDark" : "bg-orange-light text-orange-extraDark"
                )}>
                    {status == "completed" ? <Backpack size={20} weight="fill" /> : <Check size={20} weight="bold" />}
                    <p className="button">{status[0].toUpperCase() + status.slice(1)}</p>
                </div>
            }

        </>
    )
}

export default SongStatusIndicator;