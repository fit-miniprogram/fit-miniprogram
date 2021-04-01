// miniprogram/pages/homePage/search/search.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    gushulist:[],
    dadoulist:[],
    shuguolist:[],
    nenglianglist:[],
    dongwulist:[],
    list:[],
    value:""
  },

  /**
   * 生命周期函数--监听页面加载
   */

  gushu(){

  },



  searchList: function (value) {
    let that = this;
    var list = that.data.list
    wx.cloud.callFunction({ 
      name: 'searchgushuList',
      data:{
        value:that.data.value
      },
      config:{env:"fit-gc46z"}
    })
      .then(res => {
         console.log(res)
         var gushulist = list.concat(res.result.data)
         that.setData({
           gushulist:gushulist,
           list:gushulist
         })
      })
      .catch(err => {
        console.log(err);
    })
    wx.cloud.callFunction({ 
      name: 'searchdadouList',
      data:{
        value:that.data.value
      },
      config:{env:"fit-gc46z"}
    })
      .then(res => {
        console.log(res)
         var dadoulist = list.concat(res.result.data)
         that.setData({
          dadoulist:dadoulist,
          list:dadoulist
        })
      })
      .catch(err => {
        console.log(err);
    })
    wx.cloud.callFunction({ 
      name: 'searchdongwuList',
      data:{
        value:that.data.value
      },
      config:{env:"fit-gc46z"}
    })
      .then(res => {
        console.log(res)
         var dongwulist =list.concat(res.result.data)
         that.setData({
          dongwulist:dongwulist,
          list:dongwulist
        })
      })
      .catch(err => {
        console.log(err);
    })
    wx.cloud.callFunction({ 
      name: 'searchnengliangList',
      data:{
        value:that.data.value
      },
      config:{env:"fit-gc46z"}
    })
      .then(res => {
        console.log(res)
         var nenglianglist = list.concat(res.result.data)
         that.setData({
          nenglianglist:nenglianglist,
          list:nenglianglist
        })
      })
      .catch(err => {
        console.log(err);
    })
    wx.cloud.callFunction({ 
      name: 'searchshuguoList',
      data:{
        value:that.data.value
      },
      config:{env:"fit-gc46z"}
    })
      .then(res => {
        console.log(res)
        var shuguolist = list.concat(res.result.data)
        that.setData({
          shuguolist:shuguolist,
          list:shuguolist
        })
      })
      .catch(err => {
        console.log(err);
    })

    // list = that.data.dadoulist.concat(that.data.dongwulist,that.data.gushulist,that.data.nenglianglist,that.data.shuguolist)
  },


  onLoad: function (options) {
    var that =this
    console.log(options)
    that.setData({
      value:options.value
    },()=>{
        that.searchList()
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