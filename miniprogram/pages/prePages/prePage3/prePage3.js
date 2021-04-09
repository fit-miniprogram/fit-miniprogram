Page({

  /**
   * 页面的初始数据
   */
  data: {
    title_img_1: "front_img z1",
    title_img_2: "bacl_img z2"
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
    this.setData({imgurl:"http://r.photo.store.qq.com/psc?/V10siXyS0lL9dw/TmEUgtj9EK6.7V8ajmQrEKQZFCPi3X2mC6nifmcK*gIFminvhuzanRXNFmIQAMADO47Q3xdcz9Q5LBLeu2c5h5wXZ7rdhCsAN5aiCPQqrPg!/r"});
    this.setData({imgOpacity:0});
    if (wx.canIUse('hideHomeButton')) {
      wx.hideHomeButton()
    }

    //向下显示图片 总耗时1.25秒(等待0.05秒)
    setTimeout(function(){
      this.app.slideupshow(this,'slide_down',0,1,1200);
    }.bind(this),50);

    //渐显图片 总耗时2.25秒(等待1.25秒)
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
            that.setData({imgOpacity:alpha});
          }
        },100);
    }.bind(this),1250);

    //翻转显示图片 总共耗时4.5秒
    setTimeout(function(){
      that.setData({
        title_img_1: "front_img front",
        title_img_2: "back_img back",
      })
      setTimeout(function () {
        that.setData({
          title_img_1: "front_img z2",
          title_img_2: "back_img z1",
        })
      }, 1000);

    }.bind(this),2500);

    //向上弹出继续框 总耗时3.2秒(等待2秒)
    setTimeout(function(){
      that.app.slideupshow(this,'slide_up',0,1,1200);
    }.bind(this),2000);
    
    // 延时显示继续按钮
    // setTimeout(function() {
    //   that.setData({ishided:"block"});
    // }.bind(this),2000);
  },
  gtNxtPg: function(){
    this.app.slideupshow(this,'slide_down',-800,0.5,1200);
    this.app.slideupshow(this,'slide_up',200,0.5,1200);
    setTimeout(function(){
      wx.redirectTo({
        url: '../prePage4/prePage4'
      })
    }.bind(this),1200);
  },
  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    console.log("closed");
  },
})