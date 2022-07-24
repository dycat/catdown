import Link from "next/link";

export function Nav() : JSX.Element {
    return (
        // TODOs: Add show preview button
        <Link href="/help"><a className="text-sky-700">Help</a></Link>
    )
}