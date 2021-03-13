// miniprogram/pages/game/classify/classify.js
const db = wx.cloud.database({
  env: 'fit-gc46z'
});  //用db代替数据库

Page({

  /**
   * 页面的初始数据
   */
  data: {
    //设备宽高
    windowHeight:'',
    windowWidth:'',
    openid:'',
    _id:'',
    show: false,
    //游戏参数
    buttonAnswer:'',
    problemNumber:'',
    imageSrc:'',
    trueAnswer:'',
    answer:-1,
    score:0,
    tips:''
  },


  onClickShow() {
    this.setData({ show: true });
  },
  onClickHide() {
    this.setData({ show: false });
  },

  getsize(){
    let that=this;
    wx.getSystemInfo({
      success(res) {
        that.setData({
          windowHeight:res.windowHeight,
          windowWidth:res.windowWidth
        })
      },
    })
  },

  addScore(){
    var that = this
    if(that.data.buttonAnswer == that.data.trueAnswer){
      this.setData({
        answer:1
      })
      db.collection('userScore').doc(that.data._id)
        .update({
          data:{
            score:this.data.score+1
          }
        })
        wx.showToast({
          title: '答对了',
          icon: 'success',
          duration: 1000
        })
        wx.vibrateShort({})
    }
    else{
      this.setData({
        answer:0
      })
      wx.showToast({
        title: this.data.tips,
        icon: 'none',
        duration: 2000
      })
      wx.vibrateLong({})
    }

  },

  button_low(){
    this.setData({
      buttonAnswer:'low'
    })
    this.addScore()
    setTimeout(()=>{
      this.onLoad()
    },1000)
    
  },

  button_high(){
    this.setData({
      buttonAnswer:'high'
    })
    this.addScore()
    setTimeout(()=>{
      this.onLoad()
    },2000)
  },

  getProblemPicture:function(){
    //生成随机数
    var Number;
    Number = Math.floor(Math.random()*2+1).toString()
    console.log(Number)
    //从数据库中获取相应编号的题目
    db.collection('classifyGameBank').where({
      number:Number
    }).get({
      success: (res) => {
        //console.log(res.data[0].src)
        this.setData({
          imageSrc:res.data[0].src,
          trueAnswer:res.data[0].highOrLow,
          tips:res.data[0].tips
        })
      },
      fail: err =>{
        console.log("错误")
      }
    })
  },

  getOpenid:function() {
    let that = this;
    wx.cloud.callFunction({ //调用getOpenid云函数
      name: 'getOpenid',
      data:{},
      config:{env:"fit-gc46z"}
    })
    .then(res => { //调用getOpenid成功进行以下操作
      console.log(res);
      that.setData({
        openid:res.result.openid
      })
      //从数据库中获取计分记录的id
      db.collection('userScore').where({
        openid:this.data.openid
      }).get({
        success: (res) => {
          this.setData({
            _id:res.data[0]._id,
            score:res.data[0].score
          })
        },
        fail: err =>{
          console.log("错误")
        }
      })
    })
      .catch(err => { //调用getOpenid失败打印错误信息
      console.log(err);
    });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getOpenid();//获取用户的openid
    this.getsize();
    this.setData({
      answer:-1,
      tips:''
    })
    this.getProblemPicture();
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