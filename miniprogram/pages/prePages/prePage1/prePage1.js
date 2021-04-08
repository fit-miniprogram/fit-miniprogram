// pages/prePage5/prePage5.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    msg_opacity: 0,
    block1: "none",
    block2: "none"
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.app = getApp();
    this.app.loadFont();
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

    //渐显文字1 总耗时1秒 总耗时1.25+0.5=1.75
    this.opacity_fade(this,1);
    // this.app.shake(this,"slide_up1",0,125);
    setTimeout(function(){
      this.app.slideupshow(this,"slide_up1",-500,1,500);
    }.bind(this),1250)

    //渐显文字2 总耗时3.75s
    this.opacity_fade(this,2.25);
    setTimeout(function(){
      this.setData({
        block1: "block"
      })
    }.bind(this),2000)
    setTimeout(function(){
      this.app.shake(this,"slide_up2",0,125);
    }.bind(this),2250)
    setTimeout(function(){
      this.app.slideupshow(this,"slide_up2",-500,1,500);
    }.bind(this),3250)

    //渐显文字3 总耗时6s
    this.opacity_fade(this,4.25);
    setTimeout(function(){
      this.setData({
        block2: "block"
      })
    }.bind(this),4000)
    setTimeout(function(){
      this.app.shake(this,"slide_up3",0,125);
    }.bind(this),4250)
    setTimeout(function(){
      this.app.slideupshow(this,"slide_up3",-500,1,500);
    }.bind(this),5500)

    //经过6s后进入下一个页面
    setTimeout(function(){
      wx.redirectTo({
        url: '../prePage2/prePage2'
      })
    }.bind(this),6500);
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },
  opacity_fade: function(that,time){
    setTimeout(function(){
      var alpha=0,speed=0.1;
      var timer=null;
      var opTarget=1;
      timer = setInterval(function(){
          if(alpha>=opTarget){
            clearInterval(timer);
          }
          else{
            alpha+=speed;
            that.setData({msg_opacity:alpha});
          }
        },100);
    }.bind(this),time);    
  },
  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  }
})