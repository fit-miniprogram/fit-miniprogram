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
    nickname_db: "",
    profile_db: "",
    nickname_cur: "",
    profile_cur: ""
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
          nickname_db: res.data[0].nickname,
          profile_db: res.data[0].profile
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
  bindGetUserInfo: function (e) {
    let that=this;
    that.setData({ishided: 0.5});
    setTimeout(function() {
        that.setData({ishided: 1});
    }.bind(this),100);

    wx.getUserProfile({
        desc: '获取您的头像和昵称',
        success: function(res){
            var nickname=res.userInfo.nickName;
            var profile=res.userInfo.avatarUrl;
            //设置昵称和头像
            that.setData({
                nickname_cur: nickname,
                profile_cur: profile
            })
            if(that.isNeedUpdate())
              that.UpdateUserData();
            else{
              console.log("no need to update")
            }
        },
        fail: function(res){
            console.log(res)
        }
    })
  },
  UpdateUserData: function(){
    console.log("数据发生了更新")
    let that=this;
    db.collection('userdata').where({
        openid: that.data.openid
        }).update({
        data:{
            profile: that.data.profile_cur,
            nickname: that.data.nickname_cur
        }
    }).then(res=>{    
      that.setData({
        nickname_db: that.data.nickname_cur,
        profile_db: that.data.profile_cur
      })
      var temp=that.data.rank_list_nickandprofile;
      for(var i=0;i<temp.length;i++){
        //匹配id,查看用户在不在榜上
        if(temp[i].openid==that.data.openid){
          temp[i].profile=that.data.profile_cur;
          temp[i].nickname=that.data.nickname_cur;
          that.setData({
            rank_list_nickandprofile: temp
          })
          break;
        }
      }
    })
  },
  //判断数据库中的数据是否需要更新
  isNeedUpdate:function(){ 
    if(this.data.nickname_cur!=this.data.nickname_db)
        return true              
    else if(this.data.profile_cur!=this.data.profile_db)
        return true
    return false
  }
})
