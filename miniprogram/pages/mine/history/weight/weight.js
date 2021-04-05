// miniprogram/pages/mine/history/weight/weight.js
import * as echarts from '../../../../ec-canvas/echarts';

const db = wx.cloud.database({
  env: 'fit-gc46z'
});  //用db代替数据库

function initChart2(chart2, weightAll,dateAll) {
  var option = {
    title: {
      text: '体重(kg)',
      left: 'center'
    },
    color: ["#67E0E3"],
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
      min:35,
      max:130,
      splitLine: {
        lineStyle: {
          type: 'dashed'
        }
      }
    }],
    series: [ {
      name: '体重',
      type: 'line',
      smooth: true,
      data: weightAll
    }]
  };
  return option;
}

Page({

  /**
   * 页面的初始数据
   */
  data: {
    ec2: {
      onInit: initChart2
    },
    openid:''
  },

  

  //获取图表数据
  getData:function(){
    var weightAll=[],dateAll=[]

    db.collection('user') // 限制返回数量为 20 条
    .where({
      _openid: this.data.openid
    }).get({
      success: (res) => {
        //console.log(res.data)
        weightAll = res.data[0].weight_record;
        for(var i = 0 ; i < res.data[0].dateString_record.length; i ++){
          dateAll[i] = res.data[0].dateString_record[i].slice(4,6) + '/' + res.data[0].dateString_record[i].slice(6,8)
        }
        //console.log(dateAll);
        wx.hideLoading({
          success: (res) => {},
        })
        this.initGraph2(weightAll,dateAll);
      },
      fail: err =>{
        console.log("错误")
      }
    })
  },

  
  //初始化图表2
  initGraph2: function (weightAll,dateAll) {
    this.oneComponent2.init((canvas2, width, height) => {
      const chart2 = echarts.init(canvas2, null, {
        width: width,
        height: height
      });
   
      var option;
      option = initChart2(chart2, weightAll,dateAll);
      this.chart2 = chart2;
      chart2.setOption(option);
      return chart2;
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
    this.oneComponent2 = this.selectComponent('#mychartlineWeight');
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