import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';

const isProtectedRoute = createRouteMatcher(['/members(.*)', '/register(.*)']);

export default clerkMiddleware(async (auth, req) => {
  // if (isProtectedRoute(req)) await auth.protect();

  const { userId, redirectToSignIn } = await auth();

  if (!(await auth()).userId && isProtectedRoute(req)) {
    // Add custom logic to run before redirecting

    return NextResponse.redirect(new URL('/sign-in', req.url));
  }
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
};
