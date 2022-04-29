import { createClient } from "@supabase/supabase-js";//importamos la dep de Supabase

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
const supabaseAnonKey = process.env.REACT_APP_SUPABASE_ANON; //Creamos las variables de entorno y las
//usamos para conectarnos a Supabase.
export const supabase = createClient(supabaseUrl, supabaseAnonKey)//Exportamos nuestro object Supabase ya
//configurado