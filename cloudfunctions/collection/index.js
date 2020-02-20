// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
const db = cloud.database()

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  const openid = wxContext.OPENID
  
  const params = event.res
  const addOrCollection = event.addOrCollection

  const collectionRes = await db.collection('collection').add({
    data:{
      openid,
      id: params.id,
      image: params.image,
      name: params.name,
      review: params.review,
      soudUrl: params.soudUrl,
      user: params.user,
      recordingTime: params.recordingTime,
      addOrCollection
    }
  })

  const collection = collectionRes.data

  return { collection}
}