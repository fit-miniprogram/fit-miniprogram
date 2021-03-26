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
    //opacity:0,
    _id:'',
    showRule: 1,
    showGameOver:0,
    bottom:0,
    //图片
    heiban:'https://6669-fit-gc46z-1304760622.tcb.qcloud.la/classify/heiban.png?sign=861bfac560e58856f7d928a33e5a0faf&t=1616589394',
    backImg:'https://6669-fit-gc46z-1304760622.tcb.qcloud.la/classify/zhuozi.png?sign=c48fae9669b11d72ee779a3f29470bfe&t=1616589427',
    left:'https://6669-fit-gc46z-1304760622.tcb.qcloud.la/classify/left.png?sign=fcaf9ce2a40c3a76dcb1630b7f80a3d5&t=1616661909',
    right:'https://6669-fit-gc46z-1304760622.tcb.qcloud.la/classify/right.png?sign=ff96c2b1491d8225284d03d80556e7c4&t=1616661878',
    //游戏参数
    buttonAnswer:'',
    problemNumber:'',
    problemNumberAll:[],
    imageSrc:[],
    trueAnswer:'',
    answer:-1,
    score:0,
    tips:'',
    currentNum:0,
    timer1:'',
    timer2:''
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
      that.setData({
        answer:1
      })
      db.collection('userScore').doc(that.data._id)
        .update({
          data:{
            score:that.data.score+1
          }
        })
        that.setData({
        score:that.data.score+1
      })
      wx.showToast({
        title: '答对了',
        icon: 'success',
        duration: 1000
      })
      wx.vibrateShort({})
    }
    else{
      that.setData({
        answer:0
      })
      wx.showToast({
        title: that.data.tips,
        icon: 'none',
        duration: 2000
      })
      wx.vibrateLong({})
    }

  },

  buttonLeft:function(){
    var that = this;
    that.setData({
      buttonAnswer:'high'
    })
    console.log("buttonAnswer:" + that.data.buttonAnswer)
    that.addScore()

  },

  buttonRight:function(){
    var that = this;
    that.setData({
      buttonAnswer:'low'
    })
    console.log("buttonAnswer:" + that.data.buttonAnswer)
    that.addScore()
  },

  start:function(){
    var that = this;
    that.setData({
      showRule:0,
      showGameOver:0,
      opacity:0
    })
    that.gameStart()
  },

  gameStart:function(){
    var that = this;
    that.data.timer1 =setInterval(function(){
      that.getProblem()//获取传送带上显示的图片
      //that.gameStart()
    },2000)
    that.data.timer2= setTimeout(function () {
          that.stopGame()
          console.log('过40000毫秒执行一次任务')
        }, 60000);
  },

  stopGame:function(){
    var that = this;
    clearInterval(that.data.timer1)//结束定时器1
    clearTimeout(that.data.timer2)//结束定时器2
    that.setData({
      showGameOver:1
    })
    /*var animation6 = wx.createAnimation({
      duration: 1500,
      timingFunction: 'ease',
      delay: 0
     });
     animation6.opacity(1).step()
     this.setData({
      animation6: animation6.export()
     })
 
     var animation7 = wx.createAnimation({
       duration: 1500,
       timingFunction: 'ease',
       delay: 2000
      });
      animation7.opacity(1).step()
      this.setData({
       animation7: animation7.export()
      })*/
  },

  getProblemPicture:function(i,Number){
    var that = this;
    //console.log(i + "+" + Number)
    db.collection('classifyGameBank').where({
      number:Number[i]
    }).get({
      success: (res) => {
        //console.log(res.data[0])
        var string = "imageSrc[" + i.toString() + "]"
        that.setData({
          [string]:res.data[0].src,
        })
      },
      fail: err =>{
        console.log("错误")
      }
    })
  },

  getProblem:function(){
    var that = this;
    var Number=[],currentNum = that.data.currentNum;
    var i = 0;
    for(i = 0 ; i < 5 ; i ++){
      Number[i] = that.data.problemNumberAll[currentNum + i]
    }
    console.log(Number)
    //从数据库中获取第一张图相应编号的题目答案和提示
    db.collection('classifyGameBank').where({
      number:Number[0]
    }).get({
      success: (res) => {
        //console.log(res.data[0])
        that.setData({
          trueAnswer:res.data[0].highOrLow,
          tips:res.data[0].tips,
          currentNum:currentNum + 1//每刷新一次currentNum加一
        }, () => {
          console.log("trueAnswer:" + that.data.trueAnswer)
          //从数据库中获取传送带上5张图对应的图片
          var i = 0
          for(i = 0 ;i < 5; i ++){
            that.getProblemPicture(i,Number)
          }
        })
      },
      fail: err =>{
        console.log("错误")
      }
    })
    //console.log(that.data.currentNum)
    //console.log(that.data.imageSrc)
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
    var that = this
    that.getsize();
    that.getOpenid();//获取用户的openid
    getApp().loadFont();
    var i = 0;
    //生成100个随机数放入数组
    var numberAll=[]
    for(i = 0 ; i < 100 ; i ++){
      numberAll[i] = Math.floor(Math.random()*6+1).toString()
    }
    that.setData({
      show:1,
      answer:-1,
      tips:'',
      problemNumberAll:numberAll,
      currentNum:0//记录当前传送带上第一张图片在数组problemNumberAll中的位置
    })
    that.getProblem()//获取传送带上显示的图片
    setTimeout(function(){
    },5500)
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
    var that = this
    
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    that.setData({
      showRule:0,
      animation1:'',
      animation2:'',
      animation3:'',
      animation4:'',
      animation5:'',
      animation6:'',
      animation7:''
    })
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    var that = this
    clearInterval(that.data.timer1)//结束定时器1
    clearTimeout(that.data.timer2)//结束定时器2
    that.setData({
      showRule:0,
      animation1:'',
      animation2:'',
      animation3:'',
      animation4:'',
      animation5:'',
      animation6:'',
      animation7:''
    })
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