Page({
  data: {
    title_2_dis: "none",
    sub_dis: "none",
    title_2_opa: 0,
    img_block: "none",
  },
  onLoad: function (options) {
    this.app = getApp();
    this.app.loadFont();
  },
  onShow: function () {
    let that=this;
    this.setData({imgOpacity:0});
    if (wx.canIUse('hideHomeButton')) {
        wx.hideHomeButton()
      //向下弹出窗 总耗时1.25秒(等待0.05秒)
      setTimeout(function(){
        this.app.slideupshow(this,'slide_down',0,1,1200);
      }.bind(this),50);

      //显示按钮 持续0.75
      setTimeout(function(){
        that.setData({
          sub_dis: "block"
        })
      }.bind(this),1250);

      //渐显文字 持续1s
      setTimeout(function(){
        that.setData({
          title_2_dis: "block"
        })
        var alpha=0,speed=0.1;
        var timer=null;
        var opTarget=1;
        timer = setInterval(function(){
            if(alpha>=opTarget){
              clearInterval(timer);
            }
            else{
              alpha+=speed;
              that.setData({title_2_opa:alpha});
            }
          },100);
      }.bind(this),2000);

      //向右滑出图片(总时长为4.45s)
      setTimeout(function(){
        that.setData({
          img_block: "block"
        })
        that.app.sliderightshow(this,'slide_right2',0,1,1200);
      }.bind(this),3000);

      //向上弹出继续框 总耗时3.2秒(等待2秒)
      setTimeout(function(){
        that.app.slideupshow(this,'slide_up',0,1,1200);
      }.bind(this),3600);
    }
  },

  gtNxtPg: function(){
    this.app.slideupshow(this,'slide_down',-800,0.5,1200);
    this.app.slideupshow(this,'slide_up',200,0.5,1200);
    setTimeout(function(){
      wx.redirectTo({
        url: '../prePage3/prePage3'
      })
    }.bind(this),1200);
  },
})