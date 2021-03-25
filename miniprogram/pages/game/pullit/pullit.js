// pages/pullit/pullit.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // ishided1: "block",
    // ishided2: "none",
    opacity1: 0,
    opacity2: 0,
    top_distance: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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
  getlocation: function() {
    let that=this;
    wx.createSelectorQuery().select('#drag_item').boundingClientRect(function(res){
      that.setData({
        top_distance: res.top
        // opacity1: 0.5
      });
    }).exec()
    console.log(this.data.top_distance);
  }
})