// miniprogram/pages/mine/history/history.js

const db = wx.cloud.database({
  env: 'fit-gc46z'
});  //用db代替数据库
const user = db.collection('user'); //用user代替用户集合

Page({

  /**
   * 页面的初始数据
   */
  data: {
    openid:''
  },

  height:function(){
    wx.navigateTo({
      url: 'height/height?openid=' + this.data.openid,
    })
  },

  weight:function(){
    wx.navigateTo({
      url: 'weight/weight?openid=' + this.data.openid,
    })
  },

  BMI:function(){
    wx.navigateTo({
      url: 'BMI/BMI?openid=' + this.data.openid,
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //接收mine界面传来的openid
    this.setData({
      openid:options.openid
    })
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