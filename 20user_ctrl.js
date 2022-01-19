import db from './19db/index.js'

export async function getAllUser(req,res){
    const [rows] = await db.query('select id,user_name,nick_name from user_base_info')
    res.send({
        status: 0 ,
        message: "获取用户列表数据成功",
        dat: rows

    })

}
