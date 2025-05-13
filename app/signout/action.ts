'use server'
import {createClient} from "@/utils/supabase/server";
import {redirect} from "next/navigation";
import {revalidatePath} from "next/cache";

export async function logOut () {
    const supabase = await createClient()

    // type-casting here for convenience
    // in practice, you should validate your inputs

    const { error } = await supabase.auth.signOut()

    if (error) {
        redirect('/error')
    }

    revalidatePath('/', 'layout')
    redirect('/')
}