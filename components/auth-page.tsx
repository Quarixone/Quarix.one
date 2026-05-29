import Image from "next/image";
import Link from "next/link";

type AuthPageProps = {
  mode: "login" | "sign-up";
};

function GithubIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className="size-4 fill-current"
    >
      <path d="M12 2C6.48 2 2 6.58 2 12.26c0 4.53 2.87 8.37 6.84 9.73.5.1.68-.22.68-.49v-1.73c-2.78.62-3.37-1.22-3.37-1.22-.45-1.19-1.11-1.5-1.11-1.5-.91-.64.07-.63.07-.63 1 .07 1.53 1.06 1.53 1.06.89 1.57 2.34 1.12 2.91.86.09-.66.35-1.12.63-1.38-2.22-.26-4.56-1.14-4.56-5.07 0-1.12.39-2.03 1.03-2.75-.1-.26-.45-1.31.1-2.72 0 0 .84-.28 2.75 1.05A9.3 9.3 0 0 1 12 7.13c.85 0 1.71.12 2.51.34 1.91-1.33 2.75-1.05 2.75-1.05.55 1.41.2 2.46.1 2.72.64.72 1.03 1.63 1.03 2.75 0 3.94-2.34 4.81-4.57 5.06.36.32.68.95.68 1.92v2.84c0 .27.18.59.69.49A10.08 10.08 0 0 0 22 12.26C22 6.58 17.52 2 12 2Z" />
    </svg>
  );
}

export function AuthPage({ mode }: AuthPageProps) {
  const isLogin = mode === "login";
  const title = isLogin ? "Welcome back." : "Create your account.";
  const eyebrow = isLogin ? "Login to Quarix" : "Sign up for Quarix";
  const subtitle = isLogin
    ? "Access your templates, downloads, and Quarix workspace."
    : "Start collecting premium templates and launching faster.";
  const githubLabel = isLogin ? "Login with GitHub" : "Sign up with GitHub";
  const primaryLabel = isLogin ? "Login" : "Create account";
  const alternateHref = isLogin ? "/sign-up" : "/login";
  const alternateLabel = isLogin
    ? "Do not have an account?"
    : "Already have an account?";
  const alternateAction = isLogin ? "Sign up" : "Login";

  return (
    <main className="min-h-screen overflow-x-hidden bg-white text-zinc-950 dark:bg-[#050505] dark:text-white">
      <section className="mx-auto grid min-h-screen w-full max-w-6xl items-center gap-10 px-4 py-8 sm:px-6 lg:grid-cols-[0.95fr_1.05fr] lg:px-8">
        <div className="order-2 hidden overflow-hidden rounded-[2rem] border border-zinc-200 bg-zinc-50 p-6 shadow-2xl shadow-black/5 lg:block dark:border-white/10 dark:bg-white/[0.03] dark:shadow-none">
          <div className="relative min-h-[34rem] overflow-hidden rounded-[1.5rem] bg-[#07070a] p-8 text-white">
            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:56px_56px]" />
            <div className="absolute -left-24 top-24 size-72 rounded-full bg-sky-500/20 blur-3xl" />
            <div className="absolute -right-24 bottom-12 size-72 rounded-full bg-violet-500/20 blur-3xl" />
            <div className="relative flex min-h-[30rem] flex-col justify-between">
              <Link href="/" className="flex items-center gap-2 text-sm font-semibold">
                <span className="relative block size-7">
                  <Image
                    src="/quarix-logo-transparent.png"
                    alt="Quarix logo"
                    fill
                    sizes="28px"
                    className="object-contain"
                    priority
                  />
                </span>
                Quarix
              </Link>

              <div>
                <span className="inline-flex rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium text-zinc-300">
                  Templates, services, and checkout access
                </span>
                <h2 className="mt-5 max-w-md text-5xl font-semibold tracking-[-0.06em]">
                  Launch polished pages with less friction.
                </h2>
                <p className="mt-5 max-w-sm text-sm leading-6 text-zinc-400">
                  Sign in to manage template access, downloads, and future
                  Quarix products from one place.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="mx-auto w-full max-w-md lg:order-2">
          <Link
            href="/"
            className="mb-10 inline-flex items-center gap-2 text-sm font-semibold"
          >
            <span className="relative block size-7">
              <Image
                src="/quarix-logo-transparent.png"
                alt="Quarix logo"
                fill
                sizes="28px"
                className="object-contain"
                priority
              />
            </span>
            Quarix
          </Link>

          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-sky-500">
            {eyebrow}
          </p>
          <h1 className="mt-4 text-4xl font-semibold tracking-[-0.06em] sm:text-5xl">
            {title}
          </h1>
          <p className="mt-4 text-sm leading-6 text-zinc-600 dark:text-zinc-400">
            {subtitle}
          </p>

          <div className="mt-8 rounded-[2rem] border border-zinc-200 bg-white p-4 shadow-xl shadow-black/5 sm:p-5 dark:border-white/10 dark:bg-white/[0.04] dark:shadow-none">
            <button
              type="button"
              className="inline-flex h-12 w-full items-center justify-center rounded-2xl bg-zinc-950 px-5 text-sm font-semibold text-white transition hover:bg-zinc-800 dark:bg-white dark:text-zinc-950 dark:hover:bg-zinc-200"
            >
              <GithubIcon />
              <span className="ml-2">{githubLabel}</span>
            </button>

            <div className="my-5 flex items-center gap-3">
              <div className="h-px flex-1 bg-zinc-200 dark:bg-white/10" />
              <span className="text-xs font-medium text-zinc-400">
                or continue with email
              </span>
              <div className="h-px flex-1 bg-zinc-200 dark:bg-white/10" />
            </div>

            <form className="space-y-4">
              {!isLogin ? (
                <label className="block space-y-2">
                  <span className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
                    Name
                  </span>
                  <input
                    type="text"
                    placeholder="Gokulakrishnan"
                    className="h-12 w-full rounded-2xl border border-zinc-200 bg-white px-4 text-sm outline-none transition placeholder:text-zinc-400 focus:border-zinc-950 dark:border-white/10 dark:bg-white/5 dark:text-white dark:focus:border-white"
                  />
                </label>
              ) : null}

              <label className="block space-y-2">
                <span className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
                  Email
                </span>
                <input
                  type="email"
                  placeholder="you@example.com"
                  className="h-12 w-full rounded-2xl border border-zinc-200 bg-white px-4 text-sm outline-none transition placeholder:text-zinc-400 focus:border-zinc-950 dark:border-white/10 dark:bg-white/5 dark:text-white dark:focus:border-white"
                />
              </label>

              <label className="block space-y-2">
                <span className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
                  Password
                </span>
                <input
                  type="password"
                  placeholder="••••••••"
                  className="h-12 w-full rounded-2xl border border-zinc-200 bg-white px-4 text-sm outline-none transition placeholder:text-zinc-400 focus:border-zinc-950 dark:border-white/10 dark:bg-white/5 dark:text-white dark:focus:border-white"
                />
              </label>

              {isLogin ? (
                <div className="flex justify-end">
                  <Link
                    href="#"
                    className="text-sm font-medium text-zinc-500 transition hover:text-zinc-950 dark:hover:text-white"
                  >
                    Forgot password?
                  </Link>
                </div>
              ) : null}

              <button
                type="button"
                className="inline-flex h-12 w-full items-center justify-center rounded-2xl bg-sky-500 px-5 text-sm font-semibold text-white transition hover:bg-sky-400"
              >
                {primaryLabel}
              </button>
            </form>
          </div>

          <p className="mt-6 text-center text-sm text-zinc-500 dark:text-zinc-400">
            {alternateLabel}{" "}
            <Link
              href={alternateHref}
              className="font-semibold text-zinc-950 transition hover:text-sky-500 dark:text-white"
            >
              {alternateAction}
            </Link>
          </p>
        </div>
      </section>
    </main>
  );
}
