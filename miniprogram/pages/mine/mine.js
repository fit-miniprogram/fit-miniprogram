// pages/homepage/homepage.js
import Toast from '../../miniprogram_npm/@vant/weapp/toast/toast';

const db = wx.cloud.database({
  env: 'fit-gc46z'
});  //用db代替数据库
const user = db.collection('user'); //用user代替用户集合

Page({
  /**
   * 页面的初始数据
   */
  data: {
    dateString:'',
    dateString_record:[],//标记修改信息的日期
    signInDate_record:[],//标记登录的日期
    flag_height:'',//标记当天是否修改w过身高
    flag_weight:'',//标记当天是否修改过体重
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
  },

  target:function(){
    wx.navigateTo({
      url: '/pages/mine/target/target',
    })
  },

  history:function(){
    var openid = this.data.openid;
    wx.navigateTo({
      url: 'history/history?openid=' + openid,
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
      height_flag:1
    })
    db.collection('user').doc(that.data._id)
    .update({
      data:{
        height:value
      }
    })
    //是当天首次修改身高，往记录数组中添加信息
    if(!that.data.flag_height){
      this.setData({
        height_record:that.data.height_record.concat(value),
        flag_height:1
      })
      db.collection('user').doc(that.data._id)
      .update({
        data:{
          height_record:that.data.height_record,
          flag_height:1
        }
      })
      if(!that.data.flag_weight){//如果没有修改过体重，加入修改日期到记录数组
        this.setData({
          dateString_record:that.data.dateString_record.concat(that.data.dateString)
        })
        db.collection('user').doc(that.data._id)
        .update({
          data:{
            dateString_record:that.data.dateString_record
          }
        })
      }
      //修改BMI
      if(that.data.height!='---' && that.data.weight!='---'){
        //计算BMI
        var BMI;
        var height = that.data.height;
        var weight = that.data.weight;
        console.log(height)
        BMI = weight / ((height/100) * (height/100));   
        this.setData({
          BMI:BMI.toFixed(2),
          BMI_record:that.data.BMI_record.concat(BMI.toFixed(2))
        })
        db.collection('user').doc(that.data._id)
        .update({
          data:{
            BMI:BMI.toFixed(2),
            BMI_record:that.data.BMI_record
          }
        })
      }
    }
    //不是当天首次修改身高，往记录数组中添加信息
    if(that.data.flag_height){
      var height_record_temp = that.data.height_record;
      height_record_temp[height_record_temp.length - 1] = value;
      this.setData({
        height_record:height_record_temp,
        flag_height:1
      })
      db.collection('user').doc(that.data._id)
      .update({
        data:{
          height_record:height_record_temp,
          flag_height:1
        }
      })
      //修改BMI
      if(that.data.height!='---' && that.data.weight!='---'){
        //计算BMI
        var BMI;
        var height = that.data.height;
        var weight = that.data.weight;
        BMI = weight / ((height/100) * (height/100));    
        var BMI_record_temp = that.data.BMI_record;
        BMI_record_temp[BMI_record_temp.length - 1] = BMI.toFixed(2);
        this.setData({
          BMI:BMI.toFixed(2),
          BMI_record:BMI_record_temp
        })
        db.collection('user').doc(that.data._id)
        .update({
          data:{
            BMI:BMI.toFixed(2),
            BMI_record:BMI_record_temp
          }
        })
      }
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
    this.setData({
      weight:value,
      weight_flag:1
    })
    db.collection('user').doc(that.data._id)
    .update({
      data:{
        weight:value
      }
    })
    //是当天首次修改体重，往记录数组中添加信息
    if(!that.data.flag_weight){
      this.setData({
        weight_record:that.data.weight_record.concat(value),
        flag_weight:1
      })
      db.collection('user').doc(that.data._id)
      .update({
        data:{
          weight_record:that.data.weight_record,
          flag_weight:1
        }
      })
      if(!that.data.flag_height){//如果没有修改过身高，加入修改日期到记录数组
        this.setData({
          dateString_record:that.data.dateString_record.concat(that.data.dateString)
        })
        db.collection('user').doc(that.data._id)
        .update({
          data:{
            dateString_record:that.data.dateString_record
          }
        })
      }
      //修改BMI
      if(that.data.height!='---' && that.data.weight!='---'){
        //计算BMI
        var BMI;
        var height = that.data.height;
        var weight = that.data.weight;
        BMI = weight / ((height/100) * (height/100));   
        this.setData({
          BMI:BMI.toFixed(2),
          BMI_record:that.data.BMI_record.concat(BMI.toFixed(2))
        })
        db.collection('user').doc(that.data._id)
        .update({
          data:{
            BMI:BMI.toFixed(2),
            BMI_record:that.data.BMI_record
          }
        })
      }
    }
    //不是当天首次修改体重，修改记录数组中信息
    if(that.data.flag_weight){
      var weight_record_temp = that.data.weight_record;
      weight_record_temp[weight_record_temp.length - 1] = value;
      this.setData({
        weight_record:weight_record_temp,
        flag_weight:1
      })
      db.collection('user').doc(that.data._id)
      .update({
        data:{
          weight_record:weight_record_temp,
          flag_weight:1
        }
      })
      //修改BMI
      if(that.data.height!='---' && that.data.weight!='---'){
        //计算BMI
        var BMI;
        var height = that.data.height;
        var weight = that.data.weight;
        BMI = weight / ((height/100) * (height/100));    
        var BMI_record_temp = that.data.BMI_record;
        BMI_record_temp[BMI_record_temp.length - 1] = BMI.toFixed(2);
        this.setData({
          BMI:BMI.toFixed(2),
          BMI_record:BMI_record_temp
        })
        db.collection('user').doc(that.data._id)
        .update({
          data:{
            BMI:BMI.toFixed(2),
            BMI_record:BMI_record_temp
          }
        })
      }
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
              BMI_record:[],
              dateString_record:[],
              signInDate_record:[],
              flag_height:'',
              flag_weight:''
            },
            success: res => {
              console.log(res); 
              that.setData({
                _id:res._id
              })
              this.getDate()//获取当天日期
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
            _id:res.data[0]._id,
            height_record:res.data[0].height_record,
            weight_record:res.data[0].weight_record,
            BMI_record:res.data[0].BMI_record,
            dateString_record:res.data[0].dateString_record,
            signInDate_record:res.data[0].signInDate_record,
            flag_height:res.data[0].flag_height,
            flag_weight:res.data[0].flag_weight
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
          this.getDate()//获取当天日期
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
          openid:res.result.openid
        })
        that.judgeUser(res) //判断用户是否存在
        
      })
        .catch(err => { //调用getOpenid失败打印错误信息
        console.log(err);
      });
    },

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
      }
    }
    
    if(!singIn||that.data.signInDate_record.length==0){//当天没有登录过
      that.setData({
        flag_height:0,
        flag_weight:0
      })
      db.collection('user').doc(that.data._id)
      .update({
        data:{
          flag_height:0,
          flag_weight:0,
          signInDate_record:that.data.signInDate_record.concat(dateString)
        }
      })
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getOpenid()//获取用户的openid
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


