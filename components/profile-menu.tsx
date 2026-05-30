import Link from "next/link";

export function ProfileMenu() {
  return (
    <div className="hidden items-center gap-2 sm:flex">
      <Link
        href="/sign-in"
        className="text-xs font-semibold text-zinc-700 transition hover:text-zinc-950 dark:text-zinc-300 dark:hover:text-white"
      >
        Sign in
      </Link>
    </div>
  );
}
