//app.js
App({
  globalData : {
  },
  onLaunch: function () {
    if (!wx.cloud) {
      console.error('请使用 2.2.3 或以上的基础库以使用云能力')
    } else {
      wx.cloud.init({
        // env 参数说明：
        //   env 参数决定接下来小程序发起的云开发调用（wx.cloud.xxx）会默认请求到哪个云环境的资源
        //   此处请填入环境 ID, 环境 ID 可打开云控制台查看
        //   如不填则使用默认环境（第一个创建的环境）
         env: 'fit-gc46z',
        traceUser: true,
      })
      
    }
    var that = this
    wx.getSystemInfo({
      success: res => {
        console.log(res.model)
        let modelmes = res.model;
        let iphoneArr = ['iPhone X','iPhone 11','iPhone 11 Pro Max']
        iphoneArr.forEach(function(item){
          if(modelmes.search(item)!=-1)
          {
            that.globalData.isIphoneX = true
          }
        })
        // 得到安全区域高度
        
      }, fail(err) {
        console.log(err);
      }
    })



    this.loadFont()
    
  },
  //渐入，渐出实现 
  show : function(that,param,opacity){
    var animation = wx.createAnimation({
    //持续时间800ms
    duration: 800,
    timingFunction: 'ease',
    });
    //var animation = this.animation
    animation.opacity(opacity).step()
    //将param转换为key
    var json = '{"' + param + '":""}'
    json = JSON.parse(json);
    json[param] = animation.export()
    //设置动画
    that.setData(json)
  },
   
  //上下滑动渐入渐出
  slideupshow:function(that,param,px,opacity,duratime){
      var animation = wx.createAnimation({
      duration: duratime,
      timingFunction: 'ease',
      });
      animation.translateY(px).opacity(opacity).step()
      //将param转换为key
      var json = '{"' + param + '":""}'
      json = JSON.parse(json);
      json[param] = animation.export()
      //设置动画
      that.setData(json)
  },
   
  //左右滑动渐入渐出
  sliderightshow: function (that, param, px, opacity, duratime) {
    var animation = wx.createAnimation({
      duration: duratime,
      timingFunction: 'ease',
    });
    animation.translateX(px).opacity(opacity).step()
    //将param转换为key
    var json = '{"' + param + '":""}'
    json = JSON.parse(json);
    json[param] = animation.export()
    //设置动画
    that.setData(json)
  },

  //shake 晃动
  shake: function(that, param, delay, duratime){
    var animation = wx.createAnimation({
      delay: delay,
      duration: duratime,    
      timingFunction: 'linear'
    });
    animation.rotate(-60).step();
    animation.rotate(0).step();
    animation.rotate(30).step();
    animation.rotate(0).step();

    //将param转换为key
    var json = '{"' + param + '":""}'
    json = JSON.parse(json);
    json[param] = animation.export()
    //设置动画
    that.setData(json)  
  },
  
  loadFont() {
    wx.loadFontFace({
      family: 'logo',
      source: 'url("https://6669-fit-gc46z-1304760622.tcb.qcloud.la/Commercialscript.ttf?sign=523f4c1144673cd9928e56e4710cfc6b&t=1612446808")',
      success(res){
       
      },
      fail(err){
 
      },
      complete(res){
      
      }
    })

    wx.loadFontFace({
      family: 'songti',
      source: 'url("https://6669-fit-gc46z-1304760622.tcb.qcloud.la/fzzj-hfxsjw.ttf?sign=a833fc8ef7876ff3e03b1debf6c9d3d4&t=1614821008")',
      success(res){
        
      },
      fail(err){
   
      },
      complete(res){
    
      }
    })

    wx.loadFontFace({
      family: 'cola',
      source: 'url("https://6669-fit-gc46z-1304760622.tcb.qcloud.la/Coca-ColaCareFontKaiTi.ttf?sign=24c2c64c1476ab771789664d06bd58af&t=1615555621")',
      success(res){
      
      },
      fail(err){
      
      },
      complete(res){
        
      }
    })

    wx.loadFontFace({
      family: 'Bitstream',
      source: 'url("https://6669-fit-gc46z-1304760622.tcb.qcloud.la/ArtBold.ttf?sign=1c44791b6492de91bbb21fc15a232a29&t=1615685846")',
      success(res){
       
      },
      fail(err){
       
      },
      complete(res){
        
      }
    })

    wx.loadFontFace({
      family: 'jianti',
      source: 'url("https://6669-fit-gc46z-1304760622.tcb.qcloud.la/FZQKBYSJW.ttf?sign=3d7b84bbf9c9932fd8f0ff46b604343c&t=1616570648")',
      success(res){
       
      },
      fail(err){
       
      },
      complete(res){
        
      }
    })
  }





})
