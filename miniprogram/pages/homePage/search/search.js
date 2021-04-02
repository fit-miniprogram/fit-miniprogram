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
    hasItem:false,
    searchFinsh:false,
    gushu:false,
    dongwu:false,
    shuguo:false,
    nengliang:false,
    dadou:false,
    value:"肉",
    plusPic:"https://6669-fit-gc46z-1304760622.tcb.qcloud.la/listPAM/%E5%87%8F.png?sign=1064f19402ff135678866d50da47daed&t=1616664916",
    minusPic:"https://6669-fit-gc46z-1304760622.tcb.qcloud.la/listPAM/%E5%8A%A0.png?sign=6e831360b53d6cab197934255433b29f&t=1616664903"
  },

  feedback:function(){
    wx.navigateTo({
      url: '/pages/mine/feedback/feedback',
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */

  cheakList(){
  var that = this
  var interval = setInterval(function(){
      if(that.data.gushu&that.data.shuguo&that.data.nengliang&that.data.dadou&that.data.dongwu)
          {
            clearInterval(that.data.interval)
            if(that.data.list.length!=0)
            {
              that.setData({
                hasItem:true
              })
            }
            that.setData({
              searchFinsh:true,
            })
            wx.hideLoading({
              success: (res) => {},
            })
          }
      },100)
  that.setData({
    interval:interval
  }) 
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
         var gushulist = res.result.data
         that.setData({
           gushulist:gushulist,
           gushu:true
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
             var dadoulist = res.result.data
             that.setData({
              dadoulist:dadoulist,
              dadou:true
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
                 var dongwulist =res.result.data
                 that.setData({
                  dongwulist:dongwulist,
                  dongwu:true
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
                     var nenglianglist = res.result.data
                     that.setData({
                      nenglianglist:nenglianglist,
                      nengliang:true
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
                        var shuguolist = res.result.data
                        that.setData({
                          shuguolist:shuguolist,
                          shuguo:true
                        })
                        var temp = shuguolist.concat(nenglianglist,gushulist,dongwulist,dadoulist)
                        that.setData({
                          list:temp
                        })
                        console.log(temp)
                      })
                      .catch(err => {
                        console.log(err);
                    })
                
                  })
                  .catch(err => {
                    console.log(err);
                })
              })
              .catch(err => {
                console.log(err);
            })
          })
          .catch(err => {
            console.log(err);
        })
      })
      .catch(err => {
        console.log(err);
    })
    
   
    
    
    // list = that.data.dadoulist.concat(that.data.dongwulist,that.data.gushulist,that.data.nenglianglist,that.data.shuguolist)
  },


  plus(e){
    var that = this
    var index = e.currentTarget.dataset.index //这里的index是指模块的序列，非数组的下标
    var num = that.data.list[index].num
    var listNum = 'list[' + index + '].num'
    num++
    that.setData({  //注意写法
      [listNum]: num,
    })
  },

  minus(e){
    var that = this
    var index = e.currentTarget.dataset.index //这里的index是指模块的序列，非数组的下标
    var num = that.data.list[index].num
    var listNum = 'list[' + index + '].num'
    if(num==0)
    {
      return
    }
    num--
    that.setData({  //注意写法
      [listNum]: num,
    })
  },


  onLoad: function (options) {
    var that =this
    that.cheakList()
    getApp().loadFont()
    console.log(options)
    wx.showLoading({
      title:'搜索中'
    })
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
      clearInterval(this.data.interval)
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    clearInterval(this.data.interval)
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