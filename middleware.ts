import { NextRequest, NextResponse } from 'next/server';

const COOKIE = 'preview_auth';
const PASSWORD = process.env.PREVIEW_PASSWORD;

export function middleware(req: NextRequest) {
  // If no password is set in env, site is fully public
  if (!PASSWORD) return NextResponse.next();

  const { pathname } = req.nextUrl;

  // Allow the login page and its POST action through unconditionally
  if (pathname === '/preview-login') return NextResponse.next();

  // Check for valid auth cookie
  const cookie = req.cookies.get(COOKIE);
  if (cookie?.value === PASSWORD) return NextResponse.next();

  // Not authenticated — redirect to login, preserving intended destination
  const url = req.nextUrl.clone();
  url.pathname = '/preview-login';
  url.searchParams.set('from', pathname);
  return NextResponse.redirect(url);
}

export const config = {
  matcher: [
    // Match all routes except Next.js internals and static files
    '/((?!_next/static|_next/image|favicon.ico|images|videos|fonts).*)',
  ],
};
