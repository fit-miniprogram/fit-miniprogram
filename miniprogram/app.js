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
  }
})
