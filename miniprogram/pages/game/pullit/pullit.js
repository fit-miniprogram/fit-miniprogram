// pages/pullit/pullit.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    opacity1: 0,
    opacity2: 0,
    top_distance: 0,
    bottom_distance: 0,
    pageHeight: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this;
    //获得页面高度
    wx.createSelectorQuery().select('.move_area').boundingClientRect(function(res){
      that.setData({
        pageHeight: res.bottom
      });
    }).exec()
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
  onChange:function(){
    this.getedgedistance();
  },
  //计算距离两个区域的距离
  getedgedistance: function() {
    let that=this;
    wx.createSelectorQuery().select('#drag_item').boundingClientRect(function(res){
      that.setData({
        top_distance: res.top,
        bottom_distance: that.data.pageHeight-res.bottom
      });
      that.ifgetin();
    }).exec()
  },
  //判断是否进入两个区域
  ifgetin: function(){
    let that=this;
    that.setData({
      opacity1: ((134.4-that.data.top_distance)/134.4).toFixed(2),
      opacity2: ((134.4-that.data.bottom_distance)/134.4).toFixed(2)
    })
  },
  //是否确认了
  isconfirm: function(){
    // console.log(12);
  }
})