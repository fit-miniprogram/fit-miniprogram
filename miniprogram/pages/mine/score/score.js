const db = wx.cloud.database({
  env: 'fit-gc46z'
});  //用db代替数据库

const app = getApp();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    tip: "已经到底啦*>﹏<*",
    rank_list: [],
    //分数列表
    rank_list_score: [],
    //昵称和头像列表
    rank_list_nickandprofile: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getUserList();
  },
  getUserList: function (){
    let that=this;
    db.collection('userScore')
    .orderBy('score','desc')
    .get()
    .then(res=>{
      console.log(res.data)
      that.setData({
        rank_list: res.data
      })
    })
  }
})