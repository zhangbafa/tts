import { serverSupabaseClient, serverSupabaseServiceRole } from '#supabase/server'
import dayjs from 'dayjs'
export default eventHandler(async (event) => {
    const client = await serverSupabaseClient(event)
    const body = await readBody(event)
    const user = body.user || 'zhang'
    let type = body.type || 1
    const today = dayjs().format('YYYYMMDD')

    // 查询当天是否有打卡，查询最后一条记录
    // 如果是当天，则跳过打卡
    const lastRecord = await client
    .from('daka')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(1)
    if(lastRecord.data?.length>0){
        const data = lastRecord.data[0].created_at
        const createdAt = dayjs(data).format('YYYYMMDD')
        if(createdAt===today){
            return { error: '本日已经打卡', data: [],  status: 200, statusText: 'OK' }
        }

        // 判断是否连续的日期，如果是，继续打卡
        const someDate = dayjs(createdAt)
        // 获取当前日期的前一天
        const yesterday = dayjs().subtract(1, 'day')
        // 判断 someDate 是否是昨天
        const isYesterday = someDate.isSame(yesterday, 'day')
        if(!isYesterday){
            type = parseInt(lastRecord.data[0].type) +1
            console.log(`type:${type}`)
        }


    }
    
    
    // 如果不是，重新计算分段参数
    // 保存打卡记录
    const { data, error } = await client.from('daka')
    .insert([{ type,user }]).select()
    return { data, error }

})
