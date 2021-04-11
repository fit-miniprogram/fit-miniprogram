// miniprogram/pages/homePage/search/search.js
const db = wx.cloud.database({
  env: 'fit-gc46z'
}); 
Page({

  /**
   * 页面的初始数据
   */
  data: {
    //设备宽高
    windowHeight:'',
    windowWidth:'',
    showSubmitChoice:false,//标记提交选择是否显示
    openid:'',
    _id:'',
    calorie_breakfast:0,
    calorie_lunch:0,
    calorie_dinner:0,
    calorie_lingshi:0,
    gushulist:[],
    dadoulist:[],
    shuguolist:[],
    nenglianglist:[],
    dongwulist:[],
    list:[],
    hasItem:false,
    searchFinsh:false,
    gushu:false,
    dongwu:false,
    shuguo:false,
    nengliang:false,
    dadou:false,
    value:"肉",
    allCalorie:0,
    plusPic:"https://6669-fit-gc46z-1304760622.tcb.qcloud.la/listPAM/%E5%87%8F.png?sign=1064f19402ff135678866d50da47daed&t=1616664916",
    minusPic:"https://6669-fit-gc46z-1304760622.tcb.qcloud.la/listPAM/%E5%8A%A0.png?sign=6e831360b53d6cab197934255433b29f&t=1616664903"
  },

  submit:function(){
    var that = this
    console.log(that.data.list)
    var list = that.data.list
    var allCalorie = 0;
    for(var i = 0 ;i < list.nv_length;i ++){
      var calSplited = list[i].cal.split("大");
      var cal = parseInt(calSplited[0])             //该种食物每份的热量
      allCalorie += list[i].num * cal
    }
    console.log(allCalorie)
    that.setData({
      allCalorie:allCalorie
    })
    //提交食物为空
    if(allCalorie == 0){
      wx.showToast({
        title: '未选择食物数量，请重新选择',
        icon: 'none',
        duration: 2000,
        success: res => {
          that.setData({
            showSubmitChoice:false
          })
        }
      })
    }
    else{
      that.setData({
        showSubmitChoice:true
      })
    }
  },

  onClose() {
    this.setData({ showSubmitChoice: false });
  },

  submitToBreakfast(){
    wx.showLoading({
      title: '提交中',
    })
    wx.vibrateShort({
      success: (res) => {},
    })
    var that = this
    var calorie_breakfast = that.data.calorie_breakfast
    var allCalorie = that.data.allCalorie
    //提交早餐食物，修改数据库中早餐热量
    db.collection('user').doc(that.data._id)
    .update({
      data:{
        calorie_breakfast:that.data.calorie_breakfast + allCalorie
      },
      success: res => {
        console.log(res)
        wx.hideLoading({
          success: (res) => {
            wx.showToast({
              title: '提交成功',
            })
            that.setData({
              showSubmitChoice:false,
              calorie_breakfast:calorie_breakfast + allCalorie
            },()=>{
              that.cleanPageList()
            })
        },
        })
      },
      fail: err => {
        wx.showToast({
          title: '提交失败，请重试！',
        })
      }
    })
  },

  submitToLunch(){
    wx.showLoading({
      title: '提交中',
    })
    wx.vibrateShort({
      success: (res) => {},
    })
    var that = this
    var calorie_lunch = that.data.calorie_lunch
    var allCalorie = that.data.allCalorie
    //提交午餐食物，修改数据库午餐热量
    db.collection('user').doc(that.data._id)
      .update({
        data:{
          calorie_lunch:that.data.calorie_lunch + allCalorie
        },
        success: res => {
          wx.hideLoading({
            success: (res) => {
              wx.showToast({
                title: '提交成功',
              })
              that.setData({
                showSubmitChoice:false,
                calorie_lunch:calorie_lunch + allCalorie
              },()=>{
                that.cleanPageList()
              })
            },
          })
        },
        fail: err => {
          wx.showToast({
            title: '提交失败，请重试！',
          })
        }
      })
  },

  submitToDinner(){
    wx.showLoading({
      title: '提交中',
    })
    wx.vibrateShort({
      success: (res) => {},
    })
    var that = this
    var calorie_dinner = that.data.calorie_dinner
    var allCalorie = that.data.allCalorie
    //提交晚餐食物，修改数据库中晚餐热量
    db.collection('user').doc(that.data._id)
      .update({
        data:{
          calorie_dinner:that.data.calorie_dinner + allCalorie
        },
        success: res => {
          wx.hideLoading({
            success: (res) => {
              wx.showToast({
                title: '提交成功',
              })
              that.setData({
                showSubmitChoice:false,
                calorie_dinner:calorie_dinner + allCalorie
              },()=>{
                that.cleanPageList()
              })
            },
          })
        },
        fail: err => {
          wx.showToast({
            title: '提交失败，请重试！',
          })
        }
      })
  },

  submitToLingshi(){
    wx.showLoading({
      title: '提交中',
    })
    wx.vibrateShort({
      success: (res) => {},
    })
    var that = this
    var calorie_lingshi = that.data.calorie_lingshi
    var allCalorie = that.data.allCalorie
    //提交早餐食物，修改数据库中零食热量
    db.collection('user').doc(that.data._id)
      .update({
        data:{
          calorie_lingshi:that.data.calorie_lingshi + allCalorie
        },
        success: res => {
          wx.hideLoading({
            success: (res) => {
              wx.showToast({
                title: '提交成功',
              })
              that.setData({
                showSubmitChoice:false,
                calorie_lingshi:calorie_lingshi + allCalorie
              },()=>{
                that.cleanPageList()
              })
            },
          })
        },
        fail: err => {
          wx.showToast({
            title: '提交失败，请重试！',
          })
        }
      })
  },

  //清除页面中列表数据
  cleanPageList(){
    var that = this
    var list = that.data.list 
    //清除列表中的数量
    for(var i = 0 ;i < list.nv_length;i ++){
      var listNumStr = 'list[' + i + '].num'
      that.setData({
        [listNumStr]:0
      })
    }
  },

  feedback:function(){
    wx.navigateTo({
      url: '/pages/mine/feedback/feedback',
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */

  cheakList(){
  var that = this
  var interval = setInterval(function(){
      if(that.data.gushu&that.data.shuguo&that.data.nengliang&that.data.dadou&that.data.dongwu)
          {
            clearInterval(that.data.interval)
            if(that.data.list.length!=0)
            {
              that.setData({
                hasItem:true
              })
            }
            that.setData({
              searchFinsh:true,
            })
            wx.hideLoading({
              success: (res) => {},
            })
          }
      },100)
  that.setData({
    interval:interval
  }) 
  },


// 五层嵌套屎山
  searchList: function (value) {
    let that = this;
    var list = that.data.list
    wx.cloud.callFunction({ 
      name: 'searchgushuList',
      data:{
        value:that.data.value
      },
      config:{env:"fit-gc46z"}
    })
      .then(res => {
         console.log(res)
         var gushulist = res.result.data
         that.setData({
           gushulist:gushulist,
           gushu:true
         })
         wx.cloud.callFunction({ 
          name: 'searchdadouList',
          data:{
            value:that.data.value
          },
          config:{env:"fit-gc46z"}
        })
          .then(res => {
            console.log(res)
             var dadoulist = res.result.data
             that.setData({
              dadoulist:dadoulist,
              dadou:true
            })
            wx.cloud.callFunction({ 
              name: 'searchdongwuList',
              data:{
                value:that.data.value
              },
              config:{env:"fit-gc46z"}
            })
              .then(res => {
                console.log(res)
                 var dongwulist =res.result.data
                 that.setData({
                  dongwulist:dongwulist,
                  dongwu:true
                })
                wx.cloud.callFunction({ 
                  name: 'searchnengliangList',
                  data:{
                    value:that.data.value
                  },
                  config:{env:"fit-gc46z"}
                })
                  .then(res => {
                    console.log(res)
                     var nenglianglist = res.result.data
                     that.setData({
                      nenglianglist:nenglianglist,
                      nengliang:true
                    })
                    wx.cloud.callFunction({ 
                      name: 'searchshuguoList',
                      data:{
                        value:that.data.value
                      },
                      config:{env:"fit-gc46z"}
                    })
                      .then(res => {
                        console.log(res)
                        var shuguolist = res.result.data
                        that.setData({
                          shuguolist:shuguolist,
                          shuguo:true
                        })
                        var temp = shuguolist.concat(nenglianglist,gushulist,dongwulist,dadoulist)
                        that.setData({
                          list:temp
                        })
                        console.log(temp)
                      })
                      .catch(err => {
                        console.log(err);
                    })
                
                  })
                  .catch(err => {
                    console.log(err);
                })
              })
              .catch(err => {
                console.log(err);
            })
          })
          .catch(err => {
            console.log(err);
        })
      })
      .catch(err => {
        console.log(err);
    })
    
   
    
    
    // list = that.data.dadoulist.concat(that.data.dongwulist,that.data.gushulist,that.data.nenglianglist,that.data.shuguolist)
  },


  plus(e){
    var that = this
    var index = e.currentTarget.dataset.index //这里的index是指模块的序列，非数组的下标
    var num = that.data.list[index].num
    var listNum = 'list[' + index + '].num'
    num++
    that.setData({  //注意写法
      [listNum]: num,
    })
  },

  minus(e){
    var that = this
    var index = e.currentTarget.dataset.index //这里的index是指模块的序列，非数组的下标
    var num = that.data.list[index].num
    var listNum = 'list[' + index + '].num'
    if(num==0)
    {
      return
    }
    num--
    that.setData({  //注意写法
      [listNum]: num,
    })
  },

  //获取设备宽高
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

  judgeUser:function(e){ //判断用户集合中是否存在当前用户
    var that = this;
    let flag = false;
    wx.cloud.callFunction({ 
      name: 'getUserList',
      data:{
        openid:that.data.openid
      },
      config:{env:"fit-gc46z"}
    })
      .then(res => { 
        //用户存在，获取用户早中晚摄入的卡路里
        console.log(res.result.data.nv_length)
        console.log(res)
        if(res.result.data.nv_length != 0){
          console.log('用户存在')
          that.setData({
            _id:res.result.data[0]._id,
            //dateString_record:res.result.data[0].dateString_record,
            dateStirngOfHeight_record:res.result.data[0].dateStirngOfHeight_record,
            dateStirngOfWeight_record:res.result.data[0].dateStirngOfWeight_record,
            dateStirngOfBMI_record:res.result.data[0].dateStirngOfBMI_record,
            dateStirngOfCalorie_record:res.result.data[0].dateStirngOfCalorie_record,
            signInDate_record:res.result.data[0].signInDate_record,
            calorie_breakfast:res.result.data[0].calorie_breakfast,
            calorie_lunch:res.result.data[0].calorie_lunch,
            calorie_dinner:res.result.data[0].calorie_dinner,
            calorie_lingshi:res.result.data[0].calorie_lingshi
          })
          that.getDate()//获取当天日期
        }
        else if(res.result.data.nv_length == 0){
          //用户不存在，添加用户
          console.log('用户不存在')
          console.log(e)
          db.collection('user').add({ //将该用户加入用户集合
            data: { 
              openid: e,
              height:0,
              weight:0,
              BMI:0,
              height_record:[],
              weight_record:[],
              BMI_record:[],
              calorie_record:[],
              //dateString_record:[],
              dateStirngOfHeight_record:[],
              dateStirngOfWeight_record:[],
              dateStirngOfBMI_record:[],
              dateStirngOfCalorie_record:[],
              signInDate_record:[],
              flag_height:0,
              flag_weight:0,
              calorie_breakfast:0,
              calorie_lunch:0,
              calorie_dinner:0,
              calorie_lingshi:0,
              calorie_burn:0,
              targetRun:5000
            },
            success: res => {
              console.log(res); 
              that.setData({
                _id:res._id,
                calorie_breakfast:0,
                calorie_lunch:0,
                calorie_dinner:0,
                calorie_lingshi:0,
              })
              that.getDate()//获取当天日期
            },
            fail: err => {
              console.log(err);
            }
          })
        }
      })
      .catch(err => { 
        console.log(err);
      });
    
    },

  //获取当天日期
  getDate:function(){
    var that=this;
    var timestamp = Date.parse(new Date());
    var date = new Date(timestamp);
    var dateString = '';
    //获取年份  
    var Y =date.getFullYear();
    //获取月份  
    var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1);
    //获取当日日期 
    var D = date.getDate() < 10 ? '0' + date.getDate() : date.getDate(); 
    //合并日期
    dateString = Y + M + D;
    that.setData({
      dateString:dateString
    })

    //判断当天是否登录过
    var singIn=0;
    for(var i = 0 ; i < that.data.signInDate_record.length;i ++){
      if(that.data.signInDate_record[i] == that.data.dateString){//当天登陆过
        singIn=1;
        console.log('当天登录过')
      }
    }
    
    if(!singIn||that.data.signInDate_record.length==0){//当天没有登录过
      console.log('当天没有登录过')
      that.setData({
        calorie_breakfast:0,
        calorie_lunch:0,
        calorie_dinner:0,
        calorie_lingshi:0
      })
      db.collection('user').doc(that.data._id)
      .update({
        data:{
          signInDate_record:that.data.signInDate_record.concat(dateString),
          calorie_breakfast:0,
          calorie_lunch:0,
          calorie_dinner:0,
          calorie_lingshi:0
        }
      })
    }
  },

  onLoad: function (options) {
    var that =this
    that.cheakList()
    getApp().loadFont()
    that.getsize()
    var optionsString = options.info.split("|");
    console.log(optionsString)
    wx.showLoading({
      title:'搜索中'
    })
    that.setData({
      value:optionsString[0],
      openid:optionsString[1]
    },()=>{
        that.searchList()
        that.judgeUser(that.data.openid)
    })
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
      clearInterval(this.data.interval)
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    clearInterval(this.data.interval)
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