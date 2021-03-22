// miniprogram/pages/game/game.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
     
  },



  pullitshock : function(){
    var that = this
    var animation3 = wx.createAnimation({
      duration: 500,
      timingFunction: 'ease',
      delay: 0
     });
     animation3.scale(0.8,0.8).step()
     animation3.scale(1,1).step()
     that.setData({
      animation3: animation3.export()
     })
    wx.vibrateShort({
      success: (res) => {},
    })
    setTimeout(function(){
      wx.navigateTo({
        url: '../game/pullit/pullit',
      }) 
    },500)
  },
  
  catchShock : function(){
    var that = this
    var animation1 = wx.createAnimation({
      duration: 500,
      timingFunction: 'ease',
      delay: 0
     });
     animation1.scale(0.8,0.8).step()
     animation1.scale(1,1).step()
     that.setData({
      animation1: animation1.export()
     })
    wx.vibrateShort({
      success: (res) => {},
    })
    setTimeout(function(){
      wx.navigateTo({
        url: '../game/catch/catch',
      }) 
    },500)
  },

  classifyShock : function(){
    var that = this
    var animation2 = wx.createAnimation({
      duration: 500,
      timingFunction: 'ease',
      delay: 0
     });
     animation2.scale(0.8,0.8).step()
     animation2.scale(1,1).step()
     that.setData({
      animation2: animation2.export()
     })
    wx.vibrateShort({
      success: (res) => {},
    })
    setTimeout(function(){
      wx.navigateTo({
        url: '../game/classify/classify',
      }) 
    },500)
  },
   /* setTimeout({
      function(){
        wx.navigateTo({
          url: '../game/catch/catch',
        }) 
      }
    },100)*/
  
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    getApp().loadFont();
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    if (typeof this.getTabBar === 'function' &&
    this.getTabBar()) {
    this.getTabBar().setData({
      selected: 2
    })
  }
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})


