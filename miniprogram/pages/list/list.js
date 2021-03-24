
Page({

  /**
   * 页面的初始数据
   */
  data: {
      currentTab:0,
      imgGushu:"https://6669-fit-gc46z-1304760622.tcb.qcloud.la/list_img/%E7%B2%AE%E9%A3%9F%20(2).png?sign=4dc5465b9f5a1bb1b594cc827d7ad5d1&t=1616556604",
      imgShuguo:"https://6669-fit-gc46z-1304760622.tcb.qcloud.la/list_img/%E8%94%AC%E8%8F%9C.png?sign=2dce5e863ec0534abe9f040b862da062&t=1616556414",
      imgDongwu:"https://6669-fit-gc46z-1304760622.tcb.qcloud.la/list_img/%E8%82%89.png?sign=95a4d9e255d3f72b80f846746500e9c3&t=1616556461",
      imgDadou:"https://6669-fit-gc46z-1304760622.tcb.qcloud.la/list_img/%E5%8D%83%E5%8F%B6%E8%B1%86%E8%85%90.png?sign=6f7a2e0f74bfc3220b09c22632192888&t=1616556771",
      imgNengliang:"https://6669-fit-gc46z-1304760622.tcb.qcloud.la/list_img/%E6%A9%84%E6%A6%84%E6%B2%B9-Olive%20Oil.png?sign=4f3227d95fa92159e18202e8ce88a34c&t=1616556832"
  },

  swichNav(e){
    var that = this
    that.setData({
      currentTab:e.currentTarget.dataset.current
    })
  
  },

  wdnmd:function(){
    var that = this
    that.setData({
      az:"wdnmd-hover"
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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
      selected: 1
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

