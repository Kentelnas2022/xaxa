import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://saigagigwcenxuwsqoir.supabase.co';
const supabaseKey = 'sbp_36cdfa0b73383cf36b7dc9cba2c3aecd8822783b';

export const supabase = createClient(supabaseUrl, supabaseKey);