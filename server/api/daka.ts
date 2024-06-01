import { serverSupabaseClient, serverSupabaseServiceRole } from '#supabase/server'
import dayjs from 'dayjs'
export default eventHandler(async (event) => {
    const client = await serverSupabaseClient(event)
    

    
    let { data: daka, error } = await client
    .from('daka')
    .select('*')

    return { data: daka, error }
        

})
