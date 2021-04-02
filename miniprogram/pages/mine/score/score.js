const db = wx.cloud.database({
  env: 'fit-gc46z'
});  //用db代替数据库

const app = getApp();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    loadingHidden: true,
    isblocked: "none",
    tip: "已经到底啦*>﹏<*",
    rank_number: [],
    //分数列表
    rank_list_score: [],
    //昵称和头像列表
    rank_list_nickandprofile: [],
    total_length: 0,

    openid: "",
    self_score: 0,
    self_nickname: "",
    self_profile: ""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var openid=options.info;
    this.setData({
      openid: openid
    })
    this.getselfdata();
    this.getRankList();

    this.setData({
      loadingHidden: false
    });
    var that = this;
    //等待数据加载完全
    setTimeout(function(){
      that.setData({
          loadingHidden: true,
          isblocked: "block"
      });
    },1200);
  },
  getselfdata: function(){
    let that=this;
    db.collection('userScore')
    .where({
      openid: that.data.openid
    }).get({
      success: (res)=>{
        that.setData({
          self_score: res.data[0].score
        })
      },
      fail: (res)=>{
      }
    })

    db.collection('userdata')
    .where({
      openid: that.data.openid
    }).get({
      success: (res)=>{
        that.setData({
          self_nickname: res.data[0].nickname,
          self_profile: res.data[0].profile
        })
      },
      fail: (res)=>{
      }
    })
  },
  getRankList: async function(){
    let that=this;
    try{
      //查score表
      const res = await db.collection('userScore')
        .orderBy('score','desc')
        .get();
      that.setData({
        rank_list_score: res.data
      })
      //根据score的降序结果找userdata的数据
      for(let i=0;i<that.data.rank_list_score.length;i++){
        try{
          const res2=await db.collection('userdata')
            .where({
              openid: that.data.rank_list_score[i].openid
            }).get()
          that.data.rank_list_nickandprofile.push(res2.data[0]);
        }catch(e){
        }
      }
      //保存结果
      var temp=that.data.rank_list_nickandprofile;
      that.setData({
        rank_list_nickandprofile: temp
      })
      for(var i=0;i<3;i++)
        that.data.rank_number.push("")
      for(var i=3;i<that.data.rank_list_nickandprofile.length;i++)
        that.data.rank_number.push(i+1)
      temp=that.data.rank_number;
      that.setData({
        rank_number: temp
      })
    }catch(e){
    }
  },
})
