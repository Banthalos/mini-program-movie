// components/movie_item/movie_item.js
Component({
  /**
   * Component properties
   */
  properties: {
    //是否是影评内容, true:显示电影类型， false:显示影评
    isReview:{
      type: Boolean,
      value: true
    },
    movie:{
      type: Object,
      value:　{}
    },
    nav_to:{
      type: String,
      value:''
    },
    recordingTime:{
      type: String,
      value:''
    }

  },

  /**
   * Component initial data
   */
  data: {

  },

  /**
   * Component methods
   */
  methods: {
    audioPlay: function(event){
      console.log(event)
      const id = event.detail
      this.triggerEvent("AudioPlay", id)
    },

    errorLoaded(event) {
      this.setData({
        recommendImage: '/images/default.png'
      })
    },
  }
})
