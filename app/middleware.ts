// import jwt from 'jsonwebtoken';
// import cookie from 'cookie';
import { NextResponse, NextRequest } from 'next/server';

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  const response = NextResponse.next();
  //   const cookie = request.cookies.get('nextjs');
  //   console.log('cookie -> ', cookie);
  //   const allCookies = request.cookies.getAll();
  //   console.log('allCookie -> ', allCookies);
  request.cookies.has('nextjs'); // => true
  request.cookies.delete('nextjs');
  request.cookies.has('nextjs'); // => false
  response.headers.set('custom-header', 'custom-value');

  return NextResponse.redirect(new URL('/', request.url));
}

export const config = {
  matcher: '/*',
};
