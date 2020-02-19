// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
const db = cloud.database()

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  const openid = wxContext.OPENID
  
  const params = event.res

  const collectionRes = await db.collection('collection').add({
    data:{
      openid,
      id: params.movie_id,
      image: params.movie_image,
      name: params.movie_name,
      review: params.review,
      soudUrl: params.soudUrl,
      user: params.user,
      recordingTime: params.recordingTime
    }
  })

  const collection = collectionRes.data

  return { collection}
}