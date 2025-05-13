// ./action.ts
import supabase from '../../utils/supabase/client2';

export default async function getProfiles() {
    const { data, error } = await supabase
        .from('profiles')
        .select('*');

    if (error) {
        console.error('Грешка при извличане на профили:', error.message);
        return [];
    }

    return data;
}
