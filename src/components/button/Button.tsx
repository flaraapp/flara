import Link from "next/link";

interface ButtonOptions {
    text: string;
    href: string;
    disabled?: boolean;
    type: "primary" | "secondary" | "danger";
    children?: React.ReactNode;
}
export default function Button(options: ButtonOptions) {
    let className: string = "px-4 py-2 font-semibold rounded-[0.3rem] transition duration-500 text-center "
    if (options.type === "primary") {
        className += "bg-[#9aee59] hover:bg-[#6cde12] ";
    } else if (options.type === "secondary") {
        className += "bg-[#eef2f2] hover:bg-[#d4d9d9] ";
    } else if (options.type === "danger") {
        className += "bg-[#ff5252] hover:bg-[#e64747] ";
    }
    if (options.disabled) {
        className+="opacity-50 cursor-not-allowed ";
    }
    return (
        <Link href={options.href} aria-disabled={options.disabled} className="focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#9aee59] rounded-[0.3rem] cursor-pointer ">
            <div className={className}>
                {options.children || options.text}
            </div>
        </Link>
    )
}