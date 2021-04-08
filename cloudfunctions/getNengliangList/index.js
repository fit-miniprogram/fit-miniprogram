
const cloud = require('wx-server-sdk')
  
cloud.init()
const db = cloud.database()
// 云函数入口函数
exports.main = async (event, context) => {
  var openid = event.openid
  try{
    return await db.collection('nengliangList').limit(1000).get({
      success(res)
      {
        console.log(res)
      }
    })
  }catch(e){
    console.log(e)
  }
}
