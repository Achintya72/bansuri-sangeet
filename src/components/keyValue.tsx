import { ArrowDownRight, ArrowUpRight, Clock, HashStraight, NumberSquareOne, NumberSquareTwo, SquaresFour } from "@phosphor-icons/react/dist/ssr"

interface KeyValuePairProps {
    label: string,
    value: string,
    icon: "upRight" | "downRight" | "squares" | "clock" | "hash" | "one" | "two"
}

const icons = {
    upRight: <ArrowUpRight size={20} weight="thin" />,
    downRight: <ArrowDownRight size={20} weight="thin" />,
    squares: <SquaresFour size={20} weight="thin" />,
    clock: <Clock size={20} weight="thin" />,
    hash: <HashStraight size={20} weight="thin" />,
    one: <NumberSquareOne size={20} weight="thin" />,
    two: <NumberSquareTwo size={20} weight="thin" />
};


export default function KeyValuePair({ label, value, icon }: KeyValuePairProps) {
    return (
        <div className="flex items-center gap-[10px] text-white-extraDark">
            {icons[icon]}
            <p className="flex-1">{label}</p>
            <p className="button text-white-black">{value}</p>
        </div>
    )
}