import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'LIZZIE_ADMIN';
const SITE_PASSWORD = process.env.SITE_PASSWORD || 'OMUNDODELIZZIE';

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { password, checkOnly } = body;

        // Verificar se apenas queremos validar a sessão existente
        if (checkOnly) {
            const hasAccess = request.cookies.get('site_access')?.value === 'granted';
            if (hasAccess) {
                return NextResponse.json({ success: true });
            }
            return NextResponse.json({ success: false }, { status: 401 });
        }

        const upperPassword = password?.toUpperCase();

        if (upperPassword === ADMIN_PASSWORD || upperPassword === SITE_PASSWORD) {
            const response = NextResponse.json({ success: true });
            
            // Cookie válido por 7 dias
            response.cookies.set('site_access', 'granted', {
                httpOnly: true,
                secure: false, // Temporariamente false para VPS
                sameSite: 'lax',
                maxAge: 60 * 60 * 24 * 7,
                path: '/',
            });
            return response;
        }

        return NextResponse.json(
            { success: false, error: 'Palavra-passe incorreta.' },
            { status: 401 }
        );
    } catch {
        return NextResponse.json(
            { success: false, error: 'Erro no pedido.' },
            { status: 400 }
        );
    }
}
