import Link from "next/link";

export function Title(): JSX.Element {
  return (
    <Link href="/">
      <h1 className="font-sans font-medium text-2xl text-indigo-900">Cat Down</h1>
    </Link>
  );
}
