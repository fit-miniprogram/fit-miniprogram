// miniprogram/pages/mine/target/target.js
const db = wx.cloud.database({
  env: 'fit-gc46z'
});  //用db代替数据库


Page({

  /**
   * 页面的初始数据
   */
  data: {
    stepToday:0,
    targetRun:0,
    valueRun:0,
    openid:'',
    breakfast:0,
    lunch:0,
    dinner:0,
    lingshi:0,
    show_breakfast: false,
    show_lunch: false,
    show_dinner: false,
    show_lingshi: false,
    show_run: false,
    breakfast_get:'',
    lunch_get:'',
    dinner_get:'',
    lingshi_get:'',
    run_get:'',
    _id:'',
    calorieToday:0,
    targetCalorie:1200,
    valueCalorie:0
  },

  /**
   * 编辑目标步数
   */
  edit_Run(){
    this.setData({ show_run: true });
  },
  onChange_run(event) {
    // event.detail 为当前输入的值
    this.setData({
      run_get:event.detail
    })
  },

  confirm_run(event) {
    var that = this;
    this.setData({
      targetRun:parseInt(that.data.run_get)
    })
    db.collection('user').doc(that.data._id)
    .update({
      data:{
        targetRun:that.data.targetRun
      }
    })
    var vauleRunTemp = (that.data.stepToday / that.data.targetRun) * 100
    that.setData({
      vauleRun:vauleRunTemp.toFixed(0),
    })
  },

  onClose_run() {
    this.setData({ show_run: false });
  },
  

  /**
   * 早餐
   */
  edit_breakfast(){
    this.setData({ show_breakfast: true });
  },

  onChange_breakfast(event) {
    // event.detail 为当前输入的值
    this.setData({
      breakfast_get:event.detail
    })
  },

  confirm_breakfast(event) {
    var that = this;
    this.setData({
      breakfast:parseInt(that.data.breakfast_get),
      calorieToday:parseInt(that.data.breakfast_get) + that.data.lunch + that.data.dinner + that.data.lingshi
    })
    db.collection('user').doc(that.data._id)
    .update({
      data:{
        calorie_breakfast:that.data.breakfast
      }
    })
    this.setData({
      valueCalorie:((that.data.calorieToday / that.data.targetCalorie)*100).toFixed(0)
    })
  },

  onClose_breakfast() {
    this.setData({ show_breakfast: false });
  },

  /**
   * 中餐
   */
  edit_lunch(){
    this.setData({ show_lunch: true });
  },

  onChange_lunch(event) {
    // event.detail 为当前输入的值
    this.setData({
      lunch_get:event.detail
    })
  },

  confirm_lunch(event) {
    var that = this;
    this.setData({
      lunch:parseInt(that.data.lunch_get),
      calorieToday:that.data.breakfast + parseInt(that.data.lunch_get) + that.data.dinner + that.data.lingshi
    })
    db.collection('user').doc(that.data._id)
    .update({
      data:{
        calorie_lunch:that.data.lunch
      }
    })
    this.setData({
      valueCalorie:((that.data.calorieToday / that.data.targetCalorie)*100).toFixed(0)
    })
    console.log(that.data.calorieToday)
  },

  onClose_lunch() {
    this.setData({ show_lunch: false });
  },

  /**
   * 晚餐
   */
  edit_dinner(){
    this.setData({ show_dinner: true });
  },

  onChange_dinner(event) {
    // event.detail 为当前输入的值
    this.setData({
      dinner_get:event.detail
    })
  },

  confirm_dinner(event) {
    var that = this;
    this.setData({
      dinner:parseInt(that.data.dinner_get),
      calorieToday:that.data.breakfast + that.data.lunch + parseInt(that.data.dinner_get) + that.data.lingshi
    })
    db.collection('user').doc(that.data._id)
    .update({
      data:{
        calorie_dinner:that.data.dinner
      }
    })
    this.setData({
      valueCalorie:((that.data.calorieToday / that.data.targetCalorie)*100).toFixed(0)
    })
  },

  onClose_dinner() {
    this.setData({ show_dinner: false });
  },

  /**
   * 零食
   */
  edit_lingshi(){
    this.setData({ show_lingshi: true });
  },

  onChange_lingshi(event) {
    // event.detail 为当前输入的值
    this.setData({
      lingshi_get:event.detail
    })
  },

  confirm_lingshi(event) {
    var that = this;
    this.setData({
      lingshi:parseInt(that.data.lingshi_get),
      calorieToday:parseInt(that.data.lingshi_get) + that.data.lunch + that.data.dinner + that.data.breakfast
    })
    db.collection('user').doc(that.data._id)
    .update({
      data:{
        calorie_lingshi:that.data.lingshi
      }
    })
    this.setData({
      valueCalorie:((that.data.calorieToday / that.data.targetCalorie)*100).toFixed(0)
    })
  },

  onClose_lingshi() {
    this.setData({ show_lingshi: false });
  },


  //获取饮食数据
  getData:function(){
    db.collection('user') // 限制返回数量为 20 条
    .where({
      _openid: this.data.openid
    }).get({
      success: (res) => {
        var that = this;
        this.setData({
          breakfast:res.data[0].calorie_breakfast,
          lunch:res.data[0].calorie_lunch,
          dinner:res.data[0].calorie_dinner,
          lingshi:res.data[0].calorie_lingshi,
          calorieToday:res.data[0].calorie_breakfast + res.data[0].calorie_lunch + res.data[0].calorie_dinner + res.data[0].calorie_lingshi
        })
        this.setData({
          valueCalorie:((that.data.calorieToday / that.data.targetCalorie)*100).toFixed(0)
        })
      },
      fail: err =>{
        console.log("错误")
      }
    })
  },

  /**
   * 用户授权读取微信运动数据
   */

  authorizeWeRun(){
    var that = this
//首先获取用户的授权状态
    wx.getSetting({
      success(res){
        // console.log(res)
        if(!res.authSetting['scope.werun']){
// 如果用户还未授权过，需要用户授权读取微信运动数据
          wx.authorize({
            scope: 'scope.werun',
            success() {
              //读取微信步数数据
              that.getWeRunData()
            },
            fail() {
              //如果用户拒绝授权，提示用户需要同意授权才能获取他的微信运动数据
              wx.showModal({
                title: '读取微信运动数据失败',
                content: '请在小程序设置界面（「右上角」 - 「关于」 - 「右上角」 - 「设置」）中允许我们访问微信运动数据',
              })
            }
          })

        }else{
           //如果用户已授权过，直接开始同步微信运动数据
          //读取微信步数数据
          that.getWeRunData()
        }
      }
    })
  },

  /**
   * 获取微信运动数据
   */

  getWeRunData(){
    var that = this
    wx.getWeRunData({
      success(res){
        //console.log(res)
      wx.cloud.callFunction({
        name:'desrundata',
        data:{
         weRunData: wx.cloud.CloudID(res.cloudID)  //直到云函数被替换
        }
      }).then(res=>{
        console.log(res)
        var stepToday = res.result.event.weRunData.data.stepInfoList[30].step;
        var targetRunTemp = that.data.targetRun
        var vauleRunTemp = (stepToday / targetRunTemp) * 100
        that.setData({
          stepToday: res.result.event.weRunData.data.stepInfoList[30].step,
          vauleRun:vauleRunTemp.toFixed(0),
        },()=>{
          wx.hideLoading({
            success: (res) => {},
          })
        })
      })
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    wx.showLoading({
      title: '加载中',
    })
    //接收mine界面传来的openid
    var str = options.info;
    var info = str.split("|");
    console.log(info[0]);
    this.setData({
      openid:info[0],
      _id:info[1]
    })
    db.collection('user') // 限制返回数量为 20 条
    .where({
      openid: that.data.openid
    }).get({
      success: (res) => {
        that.setData({
          targetRun:res.data[0].targetRun
        })
      },
      fail: err =>{
        console.log("错误")
      }
    })
    that.getData();
    that.authorizeWeRun();
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

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})