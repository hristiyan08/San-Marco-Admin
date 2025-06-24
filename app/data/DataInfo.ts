// ./action.ts
import supabase from '../../utils/supabase/client2';
import {getEmail} from './getUserEmail'
export  async function getAllProfiles() {
    const { data, error } = await supabase
        .from('profiles')
        .select('*');

    if (error) {
        console.error('Грешка при извличане на профили:', error.message);
        return [];
    }



    return data;
}

export async function getCurrentProfileInformation(){
    const email = await getEmail();

    const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('email', email)
        .single();

    if (error) {
        console.error('Грешка при извличане на профили:', error.message);
        return [];
    }



    return data;
}
export async function getProducts(){


    const { data, error } = await supabase
        .from('products')
        .select('*')

    if (error) {
        console.error('Грешка при извличане на профили:', error.message);
        return [];
    }



    return data;
}
