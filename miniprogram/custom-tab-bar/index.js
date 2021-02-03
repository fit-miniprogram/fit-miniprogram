// tabbarComponent/tabbat.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    selected: 0,
    color: "#7A7E83",
    selectedColor: "#3cc51f",
    list: [
      {
        "pagePath": "pages/homePage/homePage",
        "iconPath": "/image/homePage.png",
        "selectedIconPath": "/image/homePage_slected.png",
      },
      {
        "pagePath":  "pages/list/list",
        "iconPath": "/image/list.png",
        "selectedIconPath": "/image/list_slected.png",
      },
      {
        "pagePath":  "pages/game/game",
        "iconPath": "/image/game.png",
        "selectedIconPath": "/image/game_slected.png",
      },
      {
        "pagePath":  "pages/mine/mine",
        "iconPath": "/image/mine.png",
        "selectedIconPath": "/image/mine_slected.png",
        
      }
    ]

  },
  attached() {
  },
  /**
   * 组件的方法列表
   */
  methods: {
    switchTab(e) {
      const data = e.currentTarget.dataset
      const url = "/"+data.path
      console.log(url)
      wx.switchTab({url})
      this.setData({
        selected: data.index
      })
    }
  }

})
