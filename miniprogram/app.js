//app.js
App({
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
    this.loadFont()
    this.globalData = {}
  },

  loadFont() {
    wx.loadFontFace({
      family: 'logo',
      source: 'url("https://6669-fit-gc46z-1304760622.tcb.qcloud.la/Commercialscript.ttf?sign=523f4c1144673cd9928e56e4710cfc6b&t=1612446808")',
      success(res){
        console.log('res', res)
      },
      fail(err){
        console.log('err', err)
      },
      complete(res){
        console.log('complete', res)
      }
    })

    wx.loadFontFace({
      family: 'songti',
      source: 'url("https://6669-fit-gc46z-1304760622.tcb.qcloud.la/fzzj-hfxsjw.ttf?sign=a833fc8ef7876ff3e03b1debf6c9d3d4&t=1614821008")',
      success(res){
        console.log('res', res)
      },
      fail(err){
        console.log('err', err)
      },
      complete(res){
        console.log('complete', res)
      }
    })

    wx.loadFontFace({
      family: 'cola',
      source: 'url("https://6669-fit-gc46z-1304760622.tcb.qcloud.la/Coca-ColaCareFontKaiTi.ttf?sign=24c2c64c1476ab771789664d06bd58af&t=1615555621")',
      success(res){
        console.log('res', res)
      },
      fail(err){
        console.log('err', err)
      },
      complete(res){
        console.log('complete', res)
      }
    })

  }





})
