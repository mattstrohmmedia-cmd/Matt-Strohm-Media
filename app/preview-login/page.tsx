import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export const metadata = { title: 'Preview — Matt Strohm Media', robots: 'noindex' };

async function login(data: FormData) {
  'use server';
  const entered = data.get('password') as string;
  const correct = process.env.PREVIEW_PASSWORD;
  const from = (data.get('from') as string) || '/';

  if (entered && correct && entered === correct) {
    const cookieStore = await cookies();
    cookieStore.set('preview_auth', correct, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 24 * 30, // 30 days
    });
    redirect(from);
  }

  redirect(`/preview-login?error=1&from=${encodeURIComponent(from)}`);
}

export default async function PreviewLogin({
  searchParams,
}: {
  searchParams: Promise<{ error?: string; from?: string }>;
}) {
  const { error, from = '/' } = await searchParams;

  return (
    <main className="min-h-screen flex items-center justify-center bg-bg px-6">
      <div className="w-full max-w-sm">
        <p className="font-display text-[0.7rem] tracking-[0.25em] uppercase text-accent mb-2">Preview Access</p>
        <h1 className="font-display text-3xl mb-8">Matt Strohm Media</h1>
        <form action={login} className="flex flex-col gap-4">
          <input type="hidden" name="from" value={from} />
          <input
            type="password"
            name="password"
            placeholder="Enter preview password"
            autoFocus
            required
            className="w-full bg-surface border border-white/10 px-5 py-4 text-sm text-text placeholder:text-text-muted focus:outline-none focus:border-accent/60 transition-colors"
          />
          {error && (
            <p className="text-xs text-red-400 tracking-wide">Incorrect password — try again.</p>
          )}
          <button
            type="submit"
            className="bg-accent text-bg text-[0.7rem] font-bold tracking-[0.18em] uppercase px-5 py-4 hover:bg-accent-bright transition-colors"
          >
            Enter Site
          </button>
        </form>
      </div>
    </main>
  );
}
