const db = wx.cloud.database({
    env: 'fit-gc46z'
});  //用db代替数据库

const app = getApp();
Page({
    data: {
        //判断小程序的API，回调，参数，组件等是否在当前版本可用。
        canIUse: wx.canIUse('button.open-type.getUserInfo'),
        btndisplay: "none",
        openid: "",
        isButtonShow:false,
        //当前昵称和头像
        nickname_cur: "",
        profile_cur: "",
        //数据库存的昵称和头像
        nickname_db: "",
        profile_db: "",
        //需要授权
        need_authority: false,
        //数据库中是否有数据
        is_havedata: false
    },
    onLoad: function () {
        let that=this;

        setTimeout(function(){
            this.getOpenid(); 
        }.bind(this),2500)

    },
    //点击授权按钮
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
                //插入数据后进入到开屏动画
                that.InsertUserData();
                wx.redirectTo({
                    url: '../prePage1/prePage1'
                })
            },
            fail: function(res){
                console.log(res)
            }
        })
    },
    //获取用户的Openid，并且查询用户的信息
    getOpenid: function(){
        let that = this;
        wx.cloud.callFunction({ //调用getOpenid云函数
          name: 'getOpenid',
          data:{},
          config:{env:"fit-gc46z"}
        })
        .then(res => { //调用getOpenid成功进行以下操作
          var od=res.result.openid;
          that.setData({
              openid: od
          })
          //从数据库中获取计分记录的id
          db.collection("userdata").where({
            // openid: od,
            openid: od
          }).get({
            success: (res) => {
                //找到了对应的id
                if(res.data.length>0){
                    wx.switchTab({
                        url: '../../homePage/homePage',
                    })                   
                }
                else{
                    that.setData({
                        isButtonShow:true
                    })
                }
            },
            fail: err =>{
              console.log("错误");
            }
          })
        })
          .catch(err => { //调用getOpenid失败打印错误信息
          console.log(err);
        });
    },
    //更新用户信息
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
        }).then(res=>
        {
        })
    },
    //插入数据库
    InsertUserData: function(){
        let that=this;
        db.collection('userdata').add({
            data:{
                openid: that.data.openid,
                nickname: that.data.nickname_cur,
                profile: that.data.profile_cur
            },
            success: res => {
                console.log("插入成功");
            },
            fail: err => {
                console.log("插入失败");
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