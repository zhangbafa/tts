import { serverSupabaseClient,serverSupabaseServiceRole } from '#supabase/server'
import dayjs from 'dayjs'
export default eventHandler(async (event) => {
  const client = await serverSupabaseClient(event)
  const query = getQuery(event)
  const today = dayjs().format('YYYYMMDD')
  try {
    let { data, error } = await client.rpc('update_count_byspeech',{
      today:today,
      num:query.num,
      type:'free-speech'
    })

    if (error) console.error(error)
    else console.log(data)
    } catch (error) {
        console.error('Error incrementing field:', error.message);
    }
  
})
