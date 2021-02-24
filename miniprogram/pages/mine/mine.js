// pages/homepage/homepage.js
import Toast from '../../miniprogram_npm/@vant/weapp/toast/toast';
import * as echarts from '../../ec-canvas/echarts';

const app = getApp();

const db = wx.cloud.database({
  env: 'fit-gc46z'
});  //用db代替数据库
const user = db.collection('user'); //用user代替用户集合

function initChart(chart, heightAll, weightAll,dateAll) {
  var option = {
    title: {
      text: '身高体重',
      left: 'center'
    },
    color: ["#37A2DA", "#67E0E3"],
    legend: {
      data: ['height', 'weight'],
      top: 50,
      left: 'center',
      backgroundColor: 'white',
      z: 100
    },
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
      name:"日期",
      nameLocation:'center'
      // show: false
    },
    yAxis: [{
      x: 'center',
      name:'身高',
      type: 'value',
      position:'left',
      min:150,
      max:195,
      splitLine: {
        lineStyle: {
          type: 'dashed'
        }
      }
      // show: false
    },{
      x: 'center',
      name:'体重',
      type: 'value',
      position:'right',
      min:40,
      max:85,
      splitLine: {
        lineStyle: {
          type: 'dashed'
        }
      }
    }],
    series: [{
      name: 'height',
      type: 'line',
      smooth: true,
      data: heightAll,
      yAxisIndex:0
    }, {
      name: 'weight',
      type: 'line',
      smooth: true,
      data: weightAll,
      yAxisIndex:1
    }]
  };
  return option;
}

function initChart2(chart2, BMIAll,dateAll) {
  var option = {
    title: {
      text: 'BMI',
      left: 'center'
    },
    color: ["#9FE6B8"],
    legend: {
      data: ['BMI'],
      top: 50,
      left: 'center',
      backgroundColor: 'white',
      z: 100
    },
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
      name:"日期",
      nameLocation:'center'
    },
    yAxis: [{
      x: 'center',
      name:'BMI',
      type: 'value',
      position:'left',
      min:16,
      max:35,
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
    ec: {
      onInit: initChart
    },
    ec2: {
      onInit: initChart2
    },
    //基本信息
    height_choose: ['150', '151', '152', '153', '154','155','156','157','158','159','160','161','162','163','164','165','166','167','168','169','170','171','172','173','174','175','176','177', '178', '179','180','181','182','183','184','185','186','187','188','189','190','191','192','193','194','195'],
    show_height: false,
    height:'---',
    height_record:[],
    weight_choose: ['40', '41', '42', '43', '44','45','46','47','48','49','50','51','52','53','54','55','56','57','58','59','60','61','62','63','64','65','66','67', '68', '69','70','71','72','73','74','75','76','77','78','79','80','81','82','83','84','85'],
    show_weight: false,
    weight:'---',
    weight_record:[],
    height_flag:0,
    weight_flag:0,
    BMI:'---',
    BMI_record:[],
    user:[],
    _id:'',
    openid:'',
    //图表数据
    /*heightData:[],
    weightData:[],
    BMIData:[],
    dateData:[]*/
  },

  target:function(){
    wx.navigateTo({
      url: '/pages/mine/target/target',
    })
  },

  history:function(){
    wx.navigateTo({
      url: '/pages/mine/history/history',
    })
  },

  sign:function(){
    wx.navigateTo({
      url: '/pages/mine/sign/sign',
    })
  },

  about:function(){
    wx.navigateTo({
      url: '/pages/mine/about/about',
    })
  },

  onConfirm_height(event) {
    var that = this
    const { picker, value, index } = event.detail;
    this.setData({
      height:value,
      height_record:that.data.height_record.concat(value),
      height_flag:1
    })
    db.collection('user').doc(that.data._id)
    .update({
      data:{
        height:value,
        height_record:that.data.height_record
      }
    })
    if(that.data.height!='---' && that.data.weight!='---'){
      console.log(that.data.weight)
      var BMI;
      var height = that.data.height;
      var weight = that.data.weight;
      console.log(height)
      BMI = weight / ((height/100) * (height/100));
      this.setData({
        BMI:BMI.toFixed(2),
        BMI_record:that.data.BMI_record.concat(BMI.toFixed(2)),
      })
      db.collection('user').doc(that.data._id)
      .update({
        data:{
          BMI:BMI.toFixed(2),
          BMI_record:that.data.BMI_record,
        }
      })
    }
    this.setData({ show_height: false });
  },

  onCancel_height() {
    Toast('取消');
  },

  showPopup_height() {
    this.setData({ show_height: true });
  },

  onClose_height() {
    this.setData({ show_height: false });
  },

  onConfirm_weight(event) {
    var that = this;
    const { picker, value, index } = event.detail;
    console.log(that.data.weight_record)
    this.setData({
      weight:value,
      weight_record:that.data.weight_record.concat(value),
      weight_flag:1
    })
    console.log(that.data.weight_record)
    db.collection('user').doc(that.data._id)
    .update({
      data:{
        weight:value,
        weight_record:that.data.weight_record,
      }
    })
    if(that.data.height!='---' && that.data.weight!='---'){
      var BMI;
      var height = that.data.height;
      var weight = that.data.weight;
      BMI = weight / ((height/100) * (height/100));
      this.setData({
        BMI:BMI.toFixed(2),
        BMI_record:that.data.BMI_record.concat(BMI.toFixed(2)),
      })
      db.collection('user').doc(that.data._id)
      .update({
        data:{
          BMI:BMI.toFixed(2),
          BMI_record:that.data.BMI_record,
        }
      })
    }
    this.setData({ show_weight: false });
  },

  onCancel_weight() {
    Toast('取消');
  },

  showPopup_weight() {
    this.setData({ show_weight: true });
  },

  onClose_weight() {
    this.setData({ show_weight: false });
  },


  judgeUser:function(e){ //判断用户集合中是否存在当前用户
    var that = this;
    let flag = false;
    //let x = this.data.user + 20
    db.collection('user') // 限制返回数量为 20 条
    .where({
      openid: e.result.openid
    }).get({
      success: (res) => {
        let user_get = res.data; //获取到的对象数组数据
        this.setData({
          user_get: this.data.user.concat(res.data)
          //users_num: x
        });
         
        console.log(user_get);
        console.log(e.result.openid);
        for (let i = 0; i < user_get.length; i++) { //遍历数据库对象集合
          if (e.result.openid === user_get[i].openid) { //Openid存在
            flag = true
          }
        }
        console.log(flag);
        if (flag === false) { //用户不存在
          console.log("用户不存在")
          db.collection('user').add({ //将该用户加入用户集合
            data: { 
              openid: e.result.openid,
              height:0,
              weight:0,
              BMI:0,
              height_record:[],
              weight_record:[],
              BMI_record:[]
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
        else {
          console.log("用户存在")
          console.log(res)
          that.setData({
            _id:res.data[0]._id
          })
          //显示用户身高、体重、BMI
          if(res.data[0].height==0 || res.data[0].weight==0){
            this.setData({
              BMI:'---'
            })
            if(res.data[0].height==0 && res.data[0].weight!=0){
              this.setData({
                height:'---',
                weight:res.data[0].weight
              })
            }
            else if(res.data[0].weight==0 && res.data[0].height!=0){
              this.setData({
                weight:'---',
                height:res.data[0].height
              })
            }
            else{
              this.setData({
                weight:'---',
                height:'---'
              })
            }
          }
          else{
            this.setData({
              weight:res.data[0].weight,
              height:res.data[0].height,
              BMI:res.data[0].BMI
            })
          }
        }
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
          openid:res
        })
        that.judgeUser(res) //判断用户是否存在
      })
        .catch(err => { //调用getOpenid失败打印错误信息
        console.log(err);
      });
    },

    
  //获取图表数据
  getData:function(){
    var heightAll=[],weightAll=[],BMIAll=[],dateAll=[]

    db.collection('sigh') // 限制返回数量为 20 条
    .where({
      _openid: this.data.openid
    }).get({
      success: (res) => {
        console.log(res.data)
        for(let i = 0 ;i < res.data.length; i++){
          heightAll = heightAll.concat(res.data[i].height);
          weightAll = weightAll.concat(res.data[i].weight);
          BMIAll = BMIAll.concat(res.data[i].BMI);
          if(res.data[i].sighDays[5]==0&&res.data[i].sighDays[6]==1){
            dateAll = dateAll.concat(res.data[i].sighDays.substring(3,5)+'.'+res.data[i].sighDays.substring(5,7));
          }
          else dateAll = dateAll.concat(res.data[i].sighDays.substring(5,7));
        }
        this.initGraph(heightAll, weightAll,dateAll);
        this.initGraph2(BMIAll,dateAll)
      },
      fail: err =>{
        console.log("错误")
      }
    })
  },

  //初始化图表1
  initGraph: function (heightAll, weightAll,dateAll) {
    this.oneComponent.init((canvas, width, height) => {
     const chart = echarts.init(canvas, null, {
      width: width,
      height: height
     });
     
     var option;
     option = initChart(chart, heightAll, weightAll,dateAll);
     this.chart = chart;
     chart.setOption(option);
     return chart;
    });
   },

   //初始化图表2
  initGraph2: function (BMIAll,dateAll) {
    this.oneComponent2.init((canvas2, width, height) => {
     const chart2 = echarts.init(canvas2, null, {
      width: width,
      height: height
     });
     
     var option;
     option = initChart2(chart2, BMIAll,dateAll);
     this.chart2 = chart2;
     chart2.setOption(option);
     return chart2;
    });
   },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.oneComponent = this.selectComponent('#mychartline');
    this.oneComponent2 = this.selectComponent('#mychartlineBMI');
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
    this.getOpenid()//获取用户的openid
    if (typeof this.getTabBar === 'function' &&
    this.getTabBar()) {
    this.getTabBar().setData({
      selected: 3
    })
  }
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


