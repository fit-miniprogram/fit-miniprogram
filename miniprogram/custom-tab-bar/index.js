var app = getApp()
Component({
  data: {
    selected: 0,
    color: "#7A7E83",
    selectedColor: "#3cc51f",
    viewHeight: app.globalData.screenHeight
  
  },
  attached() {
  },
  ready(){
    this.getSystemInfo()
  },
  methods: {
    switchTab(e) {
      const data = e.currentTarget.dataset
      const index = data.index;
      const _this = this;
      const url = data.path
      console.log(e)
      wx.switchTab({
        url: url,
        //success: function () {
          //_this.setData({
           // selected: index
        //  })
       // }
      })
    },
    getSystemInfo(){
      let isIphoneX = getApp().globalData.isIphoneX
      if(isIphoneX){
        this.setData({
          bottom:0  //为啥是零，chb不清楚，
        })
      }
    }
  }
})