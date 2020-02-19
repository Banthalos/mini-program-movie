// pages/detail/detail.js
const cloud = require('../../utils/cloud.js')
const util = require('../../utils/util.js')

const button = [{title: "我的影评", image: "/images/search.png"},
              {title: "添加影评", image: "/images/add_review.png"}]

Page({

  data: {
    id: null,
    detail: null,
    button: button,
    user: util.user().getCurrentUser() || null,
    reviewed: false
  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function (options) {
    console.log(this.data.user)
    const id = options.id
    cloud.db().fetchMovieForId(id).then(({result}) => {
      this.setData({
        detail: result,
        id
      })
    })

    this.fetchReviewOfOpenid(id)
  },

  onShow(){
    this.setData({
      user: util.user().getCurrentUser() || null
    })
  },

  fetchReviewOfOpenid: function(id){
    console.log(id)
    cloud.db().fetchReviewOfOpenId(id).then(({result}) => {
      console.log(result.data.length)
      this.setData({
        reviewed: result.data.length == 0 ? false : true
      })
    })
  },

  firstHandle:function(event){
    const user = util.user().getCurrentUser() || null

    if(!user){
      wx.showToast({
        title: '请先登录',
      })
      return
    }
    const id = this.data.id
    wx.navigateTo({
      url: '/pages/check-review/check-review?id=' + id,
    })

  },
  secondHandle: function(event){
    if (!this.data.user) {
      wx.showToast({
        title: '请先登录',
      })
      return
    }

    console.log(event)
    wx.showActionSheet({
      itemList: ["文字", "音频"],
      success: res =>{
        console.log(res)
        let tag ;
        if(res.tapIndex == 0){
          tag = ''
        }else{
          tag = 'audio'
        }

        wx.navigateTo({
          url: `/pages/review/review?id=${this.data.id}&tag=${tag}`,
        })
      }
    })
  }
  
})