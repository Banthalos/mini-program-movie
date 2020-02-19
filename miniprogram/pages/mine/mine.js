// pages/mine/mine.js
const util = require('../../utils/util.js')
const cloud = require('../../utils/cloud.js')

Page({

  /**
   * Page initial data
   */
  data: {
    user: util.user().getCurrentUser() || null

  },


  onLoad: function (options) {
  },

  onShow(){
    this.setData({
      user: util.user().getCurrentUser() || null
    })
    wx.startPullDownRefresh()
  },

  onPullDownRefresh: function () {
    this.fetchCollectionOfOpenId()
  },

   /**
     * 微信用户授权,获取用户信息
     * 判定云端是否存在此用户，不存在则添加到云端
     * 本地存储
     */
  onGotUserInfo: function (event) {
    util.user().fetchUser().then(({ user}) => {
      console.log(user, openId)
     
      this.setData({
        user
      })

      this.fetchCollectionOfOpenId()
    }).catch(error => {

    })
  },

  fetchCollectionOfOpenId(){
    const user = this.data.user
    console.log(user)
    if(user){
      cloud.db().fetchCollectionOfOpenId().then(({result}) =>{
        wx.stopPullDownRefresh()
        const {data} = result
        console.log(data)
        this.setData({
          collection:data
        })

      }).catch(error => {
        wx.stopPullDownRefresh()
      })
    }else{
      wx.stopPullDownRefresh()
    }

  },

  backToStart(){
    wx.navigateBack({ })
  },

  audioPlay: function(event){
    const soudUrl = event.detail
    console.log(soudUrl)
    if (!soudUrl) return

    var tempSound = util.midstr(soudUrl)
    console.log(tempSound)
    wx.playBackgroundAudio({
      dataUrl: tempSound,
    })
  }
  
})