// miniprogram/pages/mine/history/BMI/BMI.js
import * as echarts from '../../../../ec-canvas/echarts';

const db = wx.cloud.database({
  env: 'fit-gc46z'
});  //用db代替数据库

function initChart3(chart3, BMIAll,dateAll) {
  var option = {
    title: {
      text: 'BMI',
      left: 'center'
    },
    color: ["#9FE6B8"],
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
      nameLocation:'center'
    },
    yAxis: [{
      x: 'center',
      type: 'value',
      position:'left',
      min:7,
      max:30,
      splitLine: {
        lineStyle: {
          type: 'dashed'
        }
      }
    }],
    visualMap: {//区间内控制显示颜色
      show: false,
      dimension: 1,
      pieces: [{gte: 18.5, lte: 22.9, color: '#9FE6B8'}],
      outOfRange: {
          color: '#f7a483'
      }
    },
    series: [ {
      name: 'BMI',
      type: 'line',
      smooth: true,
      data: BMIAll
    }]
  };
  return option;
}

Page({

  /**
   * 页面的初始数据
   */
  data: {
    ec3: {
      onInit: initChart3
    },
    openid:''
  },

  

  //获取图表数据
  getData:function(){
    var BMIAll=[],dateAll=[]

    db.collection('user') // 限制返回数量为 20 条
    .where({
      _openid: this.data.openid
    }).get({
      success: (res) => {
        //console.log(res.data)
        BMIAll = res.data[0].BMI_record;
        for(var i = 0 ; i < res.data[0].dateString_record.length; i ++){
          dateAll[i] = res.data[0].dateString_record[i].slice(4,6) + '/' + res.data[0].dateString_record[i].slice(6,8)
        }
        wx.hideLoading({
          success: (res) => {},
        })
        //console.log(dateAll);
        this.initGraph3(BMIAll,dateAll)
      },
      fail: err =>{
        console.log("错误")
      }
    })
  },

  
  //初始化图表3
initGraph3: function (BMIAll,dateAll) {
  this.oneComponent3.init((canvas3, width, height) => {
    const chart3 = echarts.init(canvas3, null, {
      width: width,
      height: height
    });
   
    var option;
    option = initChart3(chart3, BMIAll,dateAll);
    this.chart3 = chart3;
    chart3.setOption(option);
    return chart3;
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
    this.oneComponent3 = this.selectComponent('#mychartlineBMI');
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