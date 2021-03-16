// pages/prePage3/prePage3.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    outter_height: "500rpx",
    inner_height: "275rpx",
    title_opacity: "0"
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.app = getApp();
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
    let that=this;
    if (wx.canIUse('hideHomeButton')) {
      wx.hideHomeButton()
    }
    setTimeout(function(){
      this.app.slideupshow(this,'slide_down',0,1,1200);
    }.bind(this),50);  

    setTimeout(function(){
      that.app.slideupshow(this,'slide_up',0,1,1200);
    }.bind(this),2000);

    //渐显字 等待2秒 持续1.1秒 总耗时3.1秒
    setTimeout(function(){
      that.setData({inner_height:"350rpx"});
      var alpha=0,speed=0.1;
      var timer=null;
      var opTarget=1;
      timer = setInterval(function(){
          if(alpha>=opTarget){
            clearInterval(timer);
          }
          else{
            alpha+=speed;
            that.setData({title_opacity:alpha});
          }
        },100);
    }.bind(this),2000);
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

  },
  //跳转到下一个页面
  gtNxtPg: function(){
    this.app.slideupshow(this,'slide_down',-400,0.5,1200);
    this.app.slideupshow(this,'slide_up',200,0.5,1200);
    setTimeout(function(){
      wx.redirectTo({
        url: '../prePage5/prePage5'
      })
    }.bind(this),1200);
  },
})