import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen p-8">
      <div className="mx-auto max-w-5xl">
        <h1 className="text-4xl font-bold">Invoice App</h1>
        <p className="mt-3 text-gray-600">
          Multi-user invoice generation with Next.js and Supabase.
        </p>

        <div className="mt-8 flex flex-wrap gap-4">
          <Link href="/login" className="rounded-xl border px-5 py-3">
            Login
          </Link>
          <Link href="/signup" className="rounded-xl border px-5 py-3">
            Sign Up
          </Link>
          <Link
            href="/invoices"
            className="rounded-xl bg-black px-5 py-3 text-white"
          >
            Go to Dashboard
          </Link>
        </div>
      </div>
    </main>
  );
}