// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

const db = cloud.database()

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  const movie_id = event.id

  const reviewREs = await db.collection("review").where({ movie_id}).get()

  const review = reviewREs.data

  return {review}
 
}