// miniprogram/pages/mine/sign/sign.js
const db = wx.cloud.database({
  env: 'fit-gc46z'
});  //用db代替数据库
const user = db.collection('user'); //用user代替用户集合

Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  searchSigh: function (e) {
    var that = this;
    console.log(e)
    db.collection("sigh").where({  	
      _openid: e.result.openid
    }).get({
      success(res) {
        console.log(res.data),
          that.setData({
            sighArr : res.data
          })   
          for(let i = 0 ; i<that.data.sighArr.length ; i++){
            for(let j = 0 ; j<that.data.arrLen ; j++){
             
              if(that.data.dateArr[j].isToday == that.data.sighArr[i].sighDays){
                var wdnmd = "dateArr["+j+"].isSigh"
                that.setData({
                  [wdnmd] : true
                })
                if(that.data.sighArr[i].sighDays==that.data.isToday)
                {
                  that.setData({
                    isTodaySigh:true
                  })
                }
                // console.log([wdnmd])
              }
              // else{
              //   console.log(j+"no")
              // }
            }
          }
          
      }  
    })
   },

   addsighdate:function(e){
    var that = this;
      db.collection('sigh').add({
        data: {
          openid:e,
          sighDays: that.data.isToday,
          isTodaySigh: true,
          weight:that.data.weight,
          height:that.data.height,
          BMI:that.data.BMI
        },
        success: res => {
          console.log(res);
        },
        fail: err => {
          console.log(err);
      
      }})
      wx.redirectTo({
        url: '/pages/homePage/homePage',
        })
    
  },
    dateInit: function (setYear, setMonth) {
      //全部时间的月份都是按0~11基准，显示月份才+1
     let dateArr = [];                        
      let arrLen = 0;                            
      let now = setYear ? new Date(setYear, setMonth) : new Date();
      let year = setYear || now.getFullYear();
      let nextYear = 0;
      let month = setMonth || now.getMonth();                    //没有+1方便后面计算当月总天数
      let nextMonth = (month + 1) > 11 ? 1 : (month + 1);
     let startWeek = new Date(year + '/' + (month + 1) + '/' + 1).getDay();                            //目标月1号对应的星期
     let dayNums = new Date(year, nextMonth, 0).getDate();                //获取目标月有多少天
     let obj = {};
     let num = 0;
     
      if (month + 1 > 11) {
         nextYear = year + 1;
         dayNums = new Date(nextYear, nextMonth, 0).getDate();
       }
       arrLen = startWeek + dayNums;
       for (let i = 0; i < arrLen; i++) {
         if (i >= startWeek) {
           num = i - startWeek + 1;
           obj = {
             isToday: '' + year + (month + 1) + num,
             dateNum: num,
             weight: 5,
             isSigh:false
           }
         } else {
           obj = {};
          }
          dateArr[i] = obj;
        }
        this.setData({
          dateArr: dateArr
        })
        this.setData({
          arrLen:arrLen
        })
        let nowDate = new Date();
        let nowYear = nowDate.getFullYear();
        let nowMonth = nowDate.getMonth() + 1;
        let nowWeek = nowDate.getDay();
        let getYear = setYear || nowYear;
        let getMonth = setMonth >= 0 ? (setMonth + 1) : nowMonth;
    
        if (nowYear == getYear && nowMonth == getMonth) {
          this.setData({
            isTodayWeek: true,
            todayIndex: nowWeek
          })
        } else {
          this.setData({
            isTodayWeek: false,
            todayIndex: -1
          })
        }
        
      },
      lastMonth: function () {
        //全部时间的月份都是按0~11基准，显示月份才+1
        let year = this.data.month - 2 < 0 ? this.data.year - 1 : this.data.year;
        let month = this.data.month - 2 < 0 ? 11 : this.data.month - 2;
        this.setData({
          year: year,
          month: (month + 1)
        })
        this.dateInit(year, month);
        this.getOpenid()
      },
      nextMonth: function () {   //全部时间的月份都是按0~11基准，显示月份才+1
       let year = this.data.month > 11 ? this.data.year + 1 : this.data.year;
       let month = this.data.month > 11 ? 0 : this.data.month;
       this.setData({
         year: year,
         month: (month + 1)
       })
       this.dateInit(year, month);
       this.getOpenid()
       
     },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let now = new Date();
    let year = now.getFullYear();
    let month = now.getMonth() + 1;
    this.dateInit();

    this.setData({
      year: year,
      month: month,
      isToday: '' + year + month + now.getDate()
    });
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