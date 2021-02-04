Component({
  data: {
    selected: 0,
    color: "#7A7E83",
    selectedColor: "#3cc51f",
  
  },
  attached() {
  },
  methods: {
    switchTab(e) {
      const data = e.currentTarget.dataset
      const index = data.index;
      const _this = this;
      const url = data.path
      wx.switchTab({
        url: url,
        //success: function () {
          //_this.setData({
           // selected: index
        //  })
       // }
      })
    }
  }
})