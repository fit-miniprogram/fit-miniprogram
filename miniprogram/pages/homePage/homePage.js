import throttle from '../../gradient-bar/utils/throttle';
const SCROLL_TOP_OFFSET = 200;
const db = wx.cloud.database({
  env: 'fit-gc46z'
}); 
Page({

  // wdnmd:function(){
  // wx.switchTab({
  //   url: '/pages/list/list',
  // })
  // },

  onShow: function () {
    //this.getQuestion()
    if (typeof this.getTabBar === 'function' &&
      this.getTabBar()) {
      this.getTabBar().setData({
        selected: 0
      })
    }
  },

  cameraTap:function(){
    wx.showToast({
      title: '还没做完，点锤子点',
      icon: 'none',
      duration: 2000
    })
  },

  speechTap: function(){
    wx.showToast({
      title: '还没做完，点锤子点',
      icon: 'none',
      duration: 2000
    })
  },


  clickMove: function (e) {
    var that = this
    this.setData({
      swiperClass: 'swiper-init swiper-moved',
      searchClass: 'searchPartInit searchPartMove',
      cameraClass: 'camera-init cameraMove',
      speechClass: 'speech-init speechMove',
      bottomClass: 'bottom-init bottomMove',
      sloganClass: 'slogan slogan-move ',
      searchShadowClass: 'searchShadow searchShadowMove',
      searchTipClass: 'searchTip-init searchTipMove',
      placeHolderContent: " "
    })
    /* setTimeout(function () {   //此处必须为that 垃圾微信
       that.setData({isShow:false})},1000)*/
  },

  moveBack: function (e) {
    /* var that = this
     setTimeout(function () {
       that.setData({isShow:true})},1000)
   */
    this.setData({
      swiperClass: 'swiper-init',
      searchClass: 'searchPartInit',
      cameraClass: 'camera-init',
      speechClass: 'speech-init',
      bottomClass: 'bottom-init',
      sloganClass: 'slogan ',
      searchShadowClass: 'searchShadow',
      searchTipClass: 'searchTip-init',
      placeHolderContent: "开 始 热 量 查 找",
      //isShow: true,
      inputValue: ''
    })
  },

  data: {
    opacity: 0,
    list: new Array(40),
    cardCur: 0,
    isTodayAnswer: false,
    questionPicBase: "",
    stem:"",
    titleImageBase64: "data:image/png;base64,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",
    placeHolderContent: "开 始 热 量 查 找",
    searchClass: 'searchPartInit ',
    sloganClass: 'slogan ',
    swiperClass: 'swiper-init ',
    cameraClass: 'camera-init',
    speechClass: 'speech-init',
    bottomClass: 'bottom-init',
    optionShow:true,
    tureAnswer:'',
    searchShadowClass: 'searchShadow',
    searchTipClass: 'searchTip-init',
    isShow: true,
    swiperList: [{
      id: 0,
      type: 'image',
      url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big84000.jpg'
    }, {
      id: 1,
      type: 'image',
      url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big84001.jpg',
    }, {
      id: 2,
      type: 'image',
      url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big39000.jpg'
    }, {
      id: 3,
      type: 'image',
      url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big10001.jpg'
    }, {
      id: 4,
      type: 'image',
      url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big25011.jpg'
    }, {
      id: 5,
      type: 'image',
      url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big21016.jpg'
    }, {
      id: 6,
      type: 'image',
      url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big99008.jpg'
    }],
  },

  questionTap:function(e){
    var that = this
    console.log(e.target.dataset.option)
    console.log(this.data.tureAnswer)
    if(e.target.dataset.option ==this.data.tureAnswer )
    {
      wx.showToast({
        
        title: '回答正确！',
        icon: 'success',
        duration: 2000,
        success(){
          var TOF = true
          that.addUserAnswer(TOF)
          that.updateScore(10)
          that.setData({
            optionShow: false,
            answerTipTrueShow:true,
            isTodayAnswer:true
          })
        }
      })
    }
    else
    {
      wx.showToast({
        title: '回答错误！',
        icon: 'error',
        duration: 2000, //在模拟器上显示错误，但是在真机上面显示正确
        success(){
          var TOF = false
          that.addUserAnswer(TOF)
          that.judgeUser()
          that.setData({
            optionShow: false,
            answerTipErrorShow:true,
            isTodayAnswer:true
          })
        }
      })
    }
  },


  getRandomQuestion:function()
  { 
    var that = this 
    db.collection('dailyQuestionBank')
      .aggregate()
      .sample({
        size:1
      })
      .end().then(  res => {  
          console.log(res.list[0]);
          that.setData({
            stem:res.list[0].stem,
            questionPicBase:res.list[0].image,
            optionOne:res.list[0].option1,
            optionTwo:res.list[0].option2,
            optionThree:res.list[0].option3,
            tureAnswer:res.list[0].tureAnswer,
            rightAnswer:res.list[0].rightAnswer,
            questionId:res.list[0]._id
          })
         })
  },

  getOriginQuestion: function(){
    var that = this
    
      db.collection("dailyQuestionBank").where({  	
        _id: that.data.questionId
      }).get({}).then(res=>{
        console.log(res.data)
        that.setData({
          stem:res.data[0].stem,
          questionPicBase:res.data[0].image,
          optionOne:res.data[0].option1,
          optionTwo:res.data[0].option2,
          optionThree:res.data[0].option3,
          tureAnswer:res.data[0].tureAnswer,
          rightAnswer:res.data[0].rightAnswer,
          questionId:res.data[0]._id
        })
      })  
},

// onReady(){
//   this.getQuestion()
// },

  onLoad() {
    var that = this
    
  //   var p1 = new Promise(function(resolve, reject){
  //     //做一些异步操作
      
  //         console.log('执行完成Promise');
  //         resolve(that.searchAnswer());
      
  // });
  //   p1.then(that.getQuestion(),console.log("wdnmd"));
    // new Promise(
    //   function(resolve,reject)
    //   {
    //     that.getQuestion()
        
    //     resolve(),     // 数据处理完成
    //     reject()       // 数据处理出错
    //   }
    // ).then(that.searchAnswer(),)
    
    that.towerSwiper('swiperList');
    that.getNowTime();
    that.getOpenid();
    // that.searchAnswer();
   // that.getQuestion()
    // that.searchAnswer();
    // setTimeout(function() {
    //   that.getQuestion();
    // }, 250);
    getApp().loadFont();
    

  },

  


  searchAnswer: function (e) {
    var that = this;
    console.log(that.data.currentOpenid)
    db.collection("userAnswer").where({ 
      openid:that.data.currentOpenid
    }).get({
      success(res) {
        console.log(res.data.length)
        if(res.data.length !=0 )
        {
          console.log("今日已回答")
          that.setData({
            answerDayArr : res.data
          })   
          
          for(let i = 0 ; i<that.data.answerDayArr.length ; i++){    
              if(that.data.answerDayArr[i].answerDay == that.data.today){
                if(res.data[i].TOF == true)
                    {
                      
                      that.setData({
                        optionShow: false,
                        answerTipTrueShow:true,
                        isTodayAnswer:true,
                        questionId:that.data.answerDayArr[i].answerQuestionId
                      },() =>{ 
                      })
                    }
                    else
                    {
                      that.setData({
                        optionShow: false,
                        answerTipErrorShow:true,
                        isTodayAnswer:true,
                        questionId:that.data.answerDayArr[i].answerQuestionId
                      },() =>{
                      })
                    }
              }
          }
          that.getOriginQuestion() 
        }
        else
        {
          console.log("今日未回答")
          that.getRandomQuestion()
        }
        
        },
        error(err){
          console.log(err)
        }
    })
   },




  updateScore:function(e){
    var that = this
    console.log(e)
    that.judgeUser()
    db.collection('userScore').where({  	
      openid: that.data.currentOpenid
    }).update({
      data: {
        score: db.command.inc(e)
      },
      success: function(res) {
        console.log(res)
      },
      error: function(err){
        console.log(err)
      }
    })
  },


   addUserAnswer:function(e){
    var that = this;
      db.collection('userAnswer').add({
        data: {
          openid:that.data.currentOpenid,
          answerDay:that.data.today,
          TOF: e,
          answerQuestionId: that.data.questionId
        },
        success: res => {
          console.log(res);
        },
        fail: err => {
          console.log(err);
      
      }}) 
  },


  judgeUser:function(e){ //判断用户集合中是否存在当前用户
    var that = this;
    let flag = false;
    db.collection('userScore') // 限制返回数量为 20 条
    .where({
      openid: that.data.currentOpenid
    }).get({
      success: (res) => {
       
        let user_get = res.data; //获取到的对象数组数据
        // that.setData({
        //   user_get: that.data.user.concat(res.data)
        // });
        console.log(res)
        for (let i = 0; i < user_get.length; i++) { //遍历数据库对象集合
          if (that.data.currentOpenid === user_get[i].openid) { //Openid存在
            flag = true
          }
        }
        if (flag === false) { //用户不存在
          console.log("用户不存在")
          db.collection('userScore').add({ //将该用户加入用户集合
            
            data: { 
              openid: that.data.currentOpenid,
              score: 0,
            },
            success: res => {
              console.log(res); 
              that.setData({
                _id:res._id
              })
            },
            fail: err => {
              console.log(err);
            }
          })
        }
      //   else {
      //     console.log("用户存在")
      //     console.log(res)
      //     that.setData({
      //       _id:res.data[0]._id,
      //       height_record:res.data[0].height_record,
      //       weight_record:res.data[0].weight_record,
      //       BMI_record:res.data[0].BMI_record,
      //       dateString_record:res.data[0].dateString_record,
      //       signInDate_record:res.data[0].signInDate_record,
      //       flag_height:res.data[0].flag_height,
      //       flag_weight:res.data[0].flag_weight,
      //       targetRun:res.data[0].targetRun
      //     })
      //     //显示用户身高、体重、BMI
      //     if(res.data[0].height==0 || res.data[0].weight==0){
      //       this.setData({
      //         BMI:'---'
      //       })
      //       if(res.data[0].height==0 && res.data[0].weight!=0){
      //         this.setData({
      //           height:'---',
      //           weight:res.data[0].weight
      //         })
      //       }
      //       else if(res.data[0].weight==0 && res.data[0].height!=0){
      //         this.setData({
      //           weight:'---',
      //           height:res.data[0].height
      //         })
      //       }
      //       else{
      //         this.setData({
      //           weight:'---',
      //           height:'---'
      //         })
      //       }
      //     }
      //     else{
      //       this.setData({
      //         weight:res.data[0].weight,
      //         height:res.data[0].height,
      //         BMI:res.data[0].BMI
      //       })
      //     }
      //     this.getDate()//获取当天日期
      //   }
        
      },
      fail: err =>{
        console.log("错误")
      }
    })
    
    },


  getOpenid: function () {
    let that = this;
    wx.cloud.callFunction({ //调用getOpenid云函数
      name: 'getOpenid',
      data:{},
      config:{env:"fit-gc46z"}
    })
      .then(res => { //调用getOpenid成功进行以下操作
       // console.log(res.result.openid);
        that.setData({
          currentOpenid: res.result.openid
        },()=>{
          that.searchAnswer()
        })
      })
      .catch(err => { //调用getOpenid失败打印错误信息
        console.log(err);
      });
  },

  getNowTime: function() {
    var that = this;
    var now = new Date();
    var year = now.getFullYear();
    var month = now.getMonth() + 1;
    var day = now.getDate();
    if(month < 10) {
      month = '0' + month;
    };
    if(day < 10) {
      day = '0' + day;
    };
    //  如果需要时分秒，就放开
    // var h = now.getHours();
    // var m = now.getMinutes();
    // var s = now.getSeconds();
    var formatDate = year+month+day
    console.log('当前时间',formatDate)
    that.setData({
      today:formatDate
    })
    return formatDate;
  },





  DotStyle(e) {
    this.setData({
      DotStyle: e.detail.value
    })
  },
  // cardSwiper
  cardSwiper(e) {
    this.setData({
      cardCur: e.detail.current
    })
  },
  // towerSwiper
  // 初始化towerSwiper
  towerSwiper(name) {
    let list = this.data[name];
    for (let i = 0; i < list.length; i++) {
      list[i].zIndex = parseInt(list.length / 2) + 1 - Math.abs(i - parseInt(list.length / 2))
      list[i].mLeft = i - parseInt(list.length / 2)
    }
    this.setData({
      swiperList: list
    })
  },
  // towerSwiper触摸开始
  towerStart(e) {
    this.setData({
      towerStart: e.touches[0].pageX
    })
  },
  // towerSwiper计算方向
  towerMove(e) {
    this.setData({
      direction: e.touches[0].pageX - this.data.towerStart > 0 ? 'right' : 'left'
    })
  },
  // towerSwiper计算滚动
  towerEnd(e) {
    let direction = this.data.direction;
    let list = this.data.swiperList;
    if (direction == 'right') {
      let mLeft = list[0].mLeft;
      let zIndex = list[0].zIndex;
      for (let i = 1; i < list.length; i++) {
        list[i - 1].mLeft = list[i].mLeft
        list[i - 1].zIndex = list[i].zIndex
      }
      list[list.length - 1].mLeft = mLeft;
      list[list.length - 1].zIndex = zIndex;
      this.setData({
        swiperList: list
      })
    } else {
      let mLeft = list[list.length - 1].mLeft;
      let zIndex = list[list.length - 1].zIndex;
      for (let i = list.length - 1; i > 0; i--) {
        list[i].mLeft = list[i - 1].mLeft
        list[i].zIndex = list[i - 1].zIndex
      }
      list[0].mLeft = mLeft;
      list[0].zIndex = zIndex;
      this.setData({
        swiperList: list
      })
    }
  },
  onPageScroll(evt) {
    throttle(this.handleScroll.bind(this), 300)(evt);
  },

  handleScroll({ scrollTop }) {
    if (scrollTop > SCROLL_TOP_OFFSET && this.data.opacity === 1) {
      // 不需要再计算
      return;
    }
    let opacity = scrollTop / SCROLL_TOP_OFFSET;
    if (scrollTop > SCROLL_TOP_OFFSET) {
      opacity = 1;
    }

    this.setData({ opacity });
  }
})




