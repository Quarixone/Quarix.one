import { LoginForm } from "@/components/login-form";

type AuthCardProps = {
  mode: "sign-in" | "sign-up";
};

export function AuthCard({ mode }: AuthCardProps) {
  return (
    <main className="min-h-screen overflow-x-hidden bg-white text-zinc-950 dark:bg-[#050505] dark:text-white">
      <section className="mx-auto grid min-h-screen w-full max-w-md items-center px-4 py-8 sm:px-6">
        <div className="mx-auto w-full max-w-sm">
          <LoginForm mode={mode} />
        </div>
      </section>
    </main>
  );
}
