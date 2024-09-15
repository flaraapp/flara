
import Link from "next/link";
import { HiOutlineArrowNarrowLeft } from "react-icons/hi";

export default function BackButton(props:any) {

    return (
        <Link
            className=" bottom-0 right-0 mr-4 sticky flex justify-end pb-4"
            href={"/dashboard"}
        >
            <div className="border p-3 w-30 rounded-full bg-white z-20 flex gap-2 items-center justify-center">
                <HiOutlineArrowNarrowLeft />
                Back
            </div>
        </Link>
    );
}
