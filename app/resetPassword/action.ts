'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

import { createClient } from '@/utils/supabase/server'

export default async function ResetPassword (formData: FormData) {
    const supabase = await createClient()

    // Получаваме новата парола от формата
    const newPassword = formData.get('password') as string

    if (!newPassword) {
        redirect('/error')  // Ако паролата не е предоставена, редиректираме към страница с грешка
    }

    // Актуализираме паролата чрез Supabase
    const { user, error } = await supabase.auth.updateUser({
        password: newPassword,
    })

    if (error) {
        console.error("Грешка при актуализиране на паролата:", error)
        redirect('/error')  // Ако има грешка, пренасочваме към страница с грешка
    }

    // Пренасочваме към началната страница след успешна актуализация
    revalidatePath('/', 'layout')
    redirect('/')  // Пренасочваме към началната страница
}
