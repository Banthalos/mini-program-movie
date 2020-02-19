import {db} from '../../utils/cloud.js'

Page({

 
  data: {
    hotMovies: null //电影列表信息
  },

  onLoad: function (options) {
    wx.startPullDownRefresh()
  },

  onPullDownRefresh: function () {
    this.fetchHotMovies()
  },

  fetchHotMovies: function(){
    db().hotMovies().then(result => {
      wx.stopPullDownRefresh()
      console.log(result)
      this.setData({
        hotMovies: result.data
      })
    }).catch(error => {
      console.log(error)
      wx.stopPullDownRefresh()
    })
  }

})