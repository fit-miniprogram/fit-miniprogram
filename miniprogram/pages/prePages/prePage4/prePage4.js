// pages/prePage4/prePage4.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

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
      that.app.sliderightshow(this,'slide_right',0,1,2400);
    }.bind(this),50);

    setTimeout(function(){
      that.app.sliderightshow(this,'slide_right2',0,1,1200);
    }.bind(this),1250);
    // var text="即刻畅享吧!";
    // var i=0;
    // var single_time=300;
    // //逐渐显示每一个字
    // var time=setInterval(function(){
    //   var sentence=text.substring(0,i);
    //   i++;
    //   that.setData({sentence:sentence});
    //   if(sentence.length==text.length){
    //     clearInterval(time);
    //   }
    //   single_time-=50;
    // },single_time);
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

  gtNxtPg: function(){
    setTimeout(function(){
      wx.switchTab({
        url: '../../homePage/homePage'
      })    
    }.bind(this),500); 
  }
})