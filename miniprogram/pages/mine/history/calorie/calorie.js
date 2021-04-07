// miniprogram/pages/mine/history/calorie/calorie.js
import * as echarts from '../../../../ec-canvas/echarts';
const db = wx.cloud.database({
  env: 'fit-gc46z'
});  //用db代替数据库

function initChart4(chart4, calorieAll, dateAll) {
  var option = {
    title: {
      text: '摄入卡路里(大卡)',
      left: 'center',
    },
    color: ["#f56363"],
    grid: {
      containLabel: true
    },
    tooltip: {
      show: true,
      trigger: 'axis'
    },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: dateAll,
    },
    yAxis: [{
      x: 'center',
      type: 'value',
      position:'left',
      min:0,
      max:4000,
      splitLine: {
        lineStyle: {
          type: 'dashed'
        }
      }
    }],
    series: [{
      name: '卡路里',
      type: 'line',
      smooth: true,
      data: calorieAll,
      yAxisIndex:0
    }]
  };
  return option;
}

Page({

  /**
   * 页面的初始数据
   */
  data: {
    ec4: {
      onInit: initChart4
    },
    openid:''
  },

  

  //获取图表数据
  getData:function(){
    var calorieAll=[],dateAll=[]

    db.collection('user') // 限制返回数量为 20 条
    .where({
      _openid: this.data.openid
    }).get({
      success: (res) => {
        console.log(res.data)
        calorieAll = res.data[0].calorie_record;
        for(var i = 0 ; i < res.data[0].dateStirngOfCalorie_record.length; i ++){
          dateAll[i] = res.data[0].dateStirngOfCalorie_record[i].slice(4,6) + '/' + res.data[0].dateStirngOfCalorie_record[i].slice(6,8)
        }
        wx.hideLoading({
          success: (res) => {},
        })
        //console.log(dateAll);
        this.initGraph4(calorieAll,dateAll)
      },
      fail: err =>{
        console.log("错误")
      }
    })
  },

  
  //初始化图表4
initGraph4: function (calorieAll,dateAll) {
  this.oneComponent4.init((canvas4, width, height) => {
    const chart4 = echarts.init(canvas4, null, {
      width: width,
      height: height
    });
   
    var option;
    option = initChart4(chart4, calorieAll,dateAll);
    this.chart4 = chart4;
    chart4.setOption(option);
    return chart4;
  },()=>{
    
  });
 },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showLoading({
      title: '加载中',
    })
    //接收history界面传来的openid
    this.setData({
      openid:options.openid
    })
    this.oneComponent4 = this.selectComponent('#mychartlineCalorie');
    //获取图表数据
    this.getData()
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