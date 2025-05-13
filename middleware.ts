import { type NextRequest, NextResponse } from 'next/server'
import { updateSession } from '@/utils/supabase/middleware'

export async function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;

    // 👉 Добави тук изключенията за публични страници
    const publicPaths = ['/resetPassword'];
    const isPublic = publicPaths.some((path) => pathname.startsWith(path));

    if (isPublic) {
        return NextResponse.next(); // Пропуска middleware-а
    }

    // Всичко останало – включва session sync
    return await updateSession(request);


}

export const config = {
    matcher: [
        // Остави си сегашния matcher – той е ок
        '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
    ],
}
