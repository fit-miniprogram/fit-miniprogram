// miniprogram/pages/mine/history/height/height.js
import * as echarts from '../../../../ec-canvas/echarts';

const db = wx.cloud.database({
  env: 'fit-gc46z'
});  //用db代替数据库

function initChart(chart, heightAll, dateAll) {
  var option = {
    title: {
      text: '身高(cm)',
      left: 'center',
    },
    color: ["#37A2DA"],
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
      min:100,
      max:210,
      splitLine: {
        lineStyle: {
          type: 'dashed'
        }
      }
    }],
    series: [{
      name: '身高',
      type: 'line',
      smooth: true,
      data: heightAll,
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
    ec: {
      onInit: initChart
    },
    openid:''
  },

  //获取图表数据
  getData:function(){
    var heightAll=[],dateAll=[]

    db.collection('user') // 限制返回数量为 20 条
    .where({
      _openid: this.data.openid
    }).get({
      success: (res) => {
        //console.log(res.data)
        heightAll = res.data[0].height_record;
        for(var i = 0 ; i < res.data[0].dateStirngOfHeight_record.length; i ++){
          dateAll[i] = res.data[0].dateStirngOfHeight_record[i].slice(4,6) + '/' + res.data[0].dateStirngOfHeight_record[i].slice(6,8)
        }
        //console.log(dateAll);
        wx.hideLoading({
          success: (res) => {},
        })
        this.initGraph(heightAll,dateAll);
      },
      fail: err =>{
        console.log("错误")
      }
    })
  },

  //初始化图表1
  initGraph: function (heightAll, dateAll) {
    this.oneComponent.init((canvas, width, height) => {
      const chart = echarts.init(canvas, null, {
        width: width,
        height: height
      });
     
      var option;
      option = initChart(chart, heightAll, dateAll);
      this.chart = chart;
      chart.setOption(option);
      return chart;
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
    this.oneComponent = this.selectComponent('#mychartline');
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