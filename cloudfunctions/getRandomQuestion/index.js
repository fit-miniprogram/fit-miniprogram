
const cloud = require('wx-server-sdk')
  
cloud.init()
const db = cloud.database()
// 云函数入口函数
exports.main = async (event, context) => {
  var openid = event.openid
  try{
    return await  db.collection('dailyQuestionBank')
          .aggregate()
          .sample({
            size:1
          })
          .end().then(res=>{
          return res
    })
  }catch(e){
    console.log(e)
  }
}