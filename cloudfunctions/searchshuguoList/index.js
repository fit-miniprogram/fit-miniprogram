// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
const db = cloud.database()
// 云函数入口函数
exports.main = async (event, context) => {
  var value = event.value

  try{
    return await db.collection('shuguoList').where({
      name:{								
        $regex:'.*' + value + '.*',		
        $options: 'i'			
      }
    }).limit(1000).get({
      success(res)
      {
        console.log(res)
      }
    })
  }catch(e){
    console.log(e)
  }
}