import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {
    const accessCookie = request.cookies.get('site_access');
    const { pathname } = request.nextUrl;

    const isAcessoPage = pathname === '/acesso';
    const isVerifyApi = pathname === '/api/verify-password';
    const isAuthPath = pathname.startsWith('/auth');
    const isStaticFile = pathname.includes('.') || pathname.startsWith('/_next');

    // Permitir acesso a páginas de autenticação, API e ficheiros estáticos
    if (isAcessoPage || isVerifyApi || isAuthPath || isStaticFile) {
        return NextResponse.next();
    }

    // Redirecionar para a página de acesso se não houver cookie (proteção global do site)
    if (!accessCookie || accessCookie.value !== 'granted') {
        const url = request.nextUrl.clone();
        url.pathname = '/acesso';
        return NextResponse.redirect(url);
    }

    return NextResponse.next();
}

// Configurar o matcher para aplicar o middleware a todas as rotas
export const config = {
    matcher: [
        /*
         * Match all request paths except for the ones starting with:
         * - api (API routes)
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico (favicon file)
         */
        '/((?!api|_next/static|_next/image|favicon.ico).*)',
    ],
};
