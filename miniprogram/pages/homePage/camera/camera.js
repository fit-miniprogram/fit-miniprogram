// miniprogram/pages/homePage/camera/detail/detail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    calorie: "",
    description: "",
    foodName: "",
    hasCalorie: "",
    pic: "",
    showNocalContent:false
    
  },

  submit(){
    var that = this
      wx.vibrateShort({
        success: (res) => {},
      })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    getApp().loadFont()
    console.log(options)
    if(options.hasCakorie == "false")
    {
      that.setData({
        hasCakorie: false
      })
    }
    else
    {
      that.setData({
        hasCakorie: true
      })
    }
    if(options.hasCakorie==true||options.foodName=='非菜')
    {
      that.setData({
        showNocalContent: true
      })
    }
    that.setData({
      calorie: options.calorie,
      description: options.description,
      foodName: options.foodName,
      pic: options.pic
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