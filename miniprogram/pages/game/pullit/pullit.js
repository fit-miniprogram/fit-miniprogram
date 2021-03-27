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
    pageHeight: 0,
    moveX: 0,
    moveY: 0,
    TOF: true,  //是否正确
    arrow_type: "showmore_arrow",
    arrow_type2: "open",
    ttblock: "none",
    content_is_blocked: "none",
    shadow_displayed: "none",
    btnboxshadow: "0rpx 0rpx 8rpx 8rpx #DDDDDD",
    drag_block: "block",
    scbtn_block: "flex",
    tt0block: "none",
    rlbtn_bcg: "rgb(255,255,255)",
    rlbtn_col: "rgb(0,0,0)"
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
    var that=this;
    //选择的选项为错误
    if(that.data.top_distance<134.4){
      if(that.data.TOF==false){
        wx.showToast({
          title: '正确!',
          icon: 'success'
        })
      }
      else{
        wx.showToast({
          title: '错误!',
          icon: 'error'
        })      
        wx.vibrateShort({
          success: (res) => {},
        })
      }
      //复原
      that.setData({
        moveX: 0,
        moveY: 0
      })
    }
    //选择的选项为正确
    else if(that.data.bottom_distance<134.4){
      if(that.data.TOF==true){
        wx.showToast({
          title: '正确!',
          icon: 'success'
        })
      }
      else{
        wx.showToast({
          title: '错误!',
          icon: 'error'
        })      
        wx.vibrateShort({
          success: (res) => {},
        })
      }
      //复原
      that.setData({
        moveX: 0,
        moveY: 0
      })
    }
    else{
      //复原
      that.setData({
        moveX: 0,
        moveY: 0
      }) 
    }
  },
  // 查看更多
  showmore: function(){
    var that=this;
    wx.vibrateShort({
      success: (res) => {},
    })
    //展开规则说明
    if(that.data.arrow_type=="showmore_arrow"){
      that.setData({
        arrow_type: "showless_arrow",
        content_is_blocked: "block",
        shadow_displayed: "block",
        drag_block: "none",
        scbtn_block: "none",
        tt0block: "block",
        ttblock: "none",
        ar2block: "none",
        rlbtn_bcg: "#969696",             /* 修改规则说明盒子背景颜色和字体颜色*/
        rlbtn_col: "rgb(255,255,255)",
        btnboxshadow: ""
      })

    }
    //收起规则说明
    else{
      that.setData({
        arrow_type: "showmore_arrow",
        content_is_blocked: "none",
        shadow_displayed: "none",
        drag_block: "block",
        scbtn_block: "flex",              /* 整个积分盒子 */
        tt0block: "none",
        ttblock: "none",                  /* 积分标题盒子 */
        arrow_type2: "open",
        rlbtn_bcg: "rgb(255,255,255)",    /* 修改规则说明盒子背景颜色和字体颜色*/
        rlbtn_col: "rgb(0,0,0)",
        btnboxshadow: "0rpx 0rpx 8rpx 8rpx #DDDDDD"
      })
    }
  },
  //展开或收起
  oporba: function(){
    var that=this;
    wx.vibrateShort({
      success: (res) => {},
    })
    if(that.data.arrow_type2=="open"){
      that.setData({
        ttblock: "block",
        arrow_type2: "back"
      })   
    }
    else{
      that.setData({
        ttblock: "none",
        arrow_type2: "open"
      }) 
    }
  }
})