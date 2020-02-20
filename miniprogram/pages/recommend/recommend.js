// pages/recommend/recommend.js

const cloud = require('../../utils/cloud.js')
const util = require('../../utils/util.js')

const button = [{ title: "收藏影评", image: "/images/search.png" },
{ title: "编写影评", image: "/images/add_review.png" }]


Page({

  /**
   * Page initial data
   */
  data: {
    button:button
  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function (options) {
    const id = options.id
    const isShow = options.isShow
    this.setData({isShow})
    console.log(options)
    this.fetchReviewOfId(id)
  },

  //根据影评ID获取影评信息
  fetchReviewOfId: function(id){
    cloud.db().fetchReviewOfId(id).then(({result}) => {
      const reviewRes = result.review[0]
      console.log(reviewRes)
      this.setData({
        reviewRes,
        movie_image: reviewRes.image,
        movie_id: reviewRes.id, 
        movie_name: reviewRes.name,
        user: reviewRes.user,
        input: reviewRes.review,
        soudUrl: reviewRes.soudUrl,
        recordingTime: reviewRes.recordingTime
      })
    })
  },

  //编写影评
  releaseHandle: function(event){
    console.log(event)
    const id = event.detail
    wx.showActionSheet({
      itemList: ["文字", "音频"],
      success: res => {
        let tag;
        if (res.tapIndex == 0) {
          tag = ''
        } else {
          tag = 'audio'
        }

        wx.navigateTo({
          url: `/pages/review/review?id=${id}&tag=${tag}`,
        })

      }
    })
  },
  //收藏影评 （电影id, 电影名字，电影图片，影评人信息，影评内容）
  collectionHandle(){
    console.log(this.data.reviewRes)
    const collection = "collection"
    cloud.db().collection(this.data.reviewRes, collection).then(({result}) => {
      
      wx.showToast({
        title: '收藏成功',
      })
    })
  },
  audioPlay: function(event){
    const soudUrl = event.target.id
    if(!soudUrl) return

    var tempSound = util.midstr(soudUrl)
    console.log(tempSound)
    wx.playBackgroundAudio({
      dataUrl: tempSound,
    })
  }


})