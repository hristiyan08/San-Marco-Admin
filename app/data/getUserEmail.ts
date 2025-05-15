'use client'
import {createClient} from "../../utils/supabase/client";

const supabase = createClient();
let email = "";

export async function getEmail() {
    const { data: { user }, error } = await supabase.auth.getUser();

    if (error) {
        console.error('Error:', error.message);
    } else {
        // Check if user data exists and log the email
        if (user && user.email) {
            email = user.email;
        } else {
            console.log('No user found');
        }
    }
    return email;
}
