// miniprogram/pages/mine/sign/sign.js
const db = wx.cloud.database({
  env: 'fit-gc46z'
}); //用db代替数据库
Page({
     data: {
       year: 0,
       month: 0,
       date: ['日', '一', '二', '三', '四', '五', '六'],
       dateArr: [],
       isToday: 0,
       isTodayWeek: false,
       todayIndex: 0,
       sighArr:[],
       isTodaySigh:false
     
 },
 onShow:function(){
   this.getOpenid()

 },
   onLoad: function () {
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
 getOpenid: function () {
  let that = this;
  wx.cloud.callFunction({ //调用getOpenid云函数
    name: 'getOpenid',
    data:{},
    config:{env:"fit-gc46z"}
  })
    .then(res => { //调用getOpenid成功进行以下操作
      console.log(res);
      that.setData({
        currentOpenid: res
      })
      that.searchSigh(res); 
    })
    .catch(err => { //调用getOpenid失败打印错误信息
      console.log(err);
    });
},

 searchSigh: function (e) {
  var that = this;

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
        isTodaySigh: true
      },
      success: res => {
        console.log(res);
      },
      fail: err => {
        console.log(err);
    
    }})
    wx.redirectTo({
      url: '/pages/mine/sign/sign',
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
   }
   
  })