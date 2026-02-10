import { LoginCard } from "./ui";

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-[#0a0a0c] text-white flex items-center justify-center">
      <div className="absolute inset-0 bg-grid opacity-30" />
      <div className="absolute inset-0 bg-gradient-to-b from-white/[0.06] via-transparent to-transparent" />

      <div className="relative w-full max-w-md px-6">
        <LoginCard />
      </div>
    </div>
  );
}