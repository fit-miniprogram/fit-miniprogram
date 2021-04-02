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
        //延时显示按钮
        setTimeout(function(){
        this.setData({
            btndisplay: "block"
        })
        }.bind(this),1000)

        //获取用户当前信息
        wx.getUserInfo({
            success: function(res){
                var nickname=res.userInfo.nickName;
                var profile=res.userInfo.avatarUrl;
                //设置昵称和头像
                that.setData({
                    nickname_cur: nickname,
                    profile_cur: profile
                })
            },
            fail: err =>{
                that.setData({
                    need_authority: true
                })
                console.log("没有授权");
            }
        })
        this.getOpenid();

    },
    //点击授权按钮
    bindGetUserInfo: function (e) {
        let that=this;
        that.setData({ishided: 0.5});
        setTimeout(function() {
            that.setData({ishided: 1});
        }.bind(this),100);

        //授权成功后，跳转进入小程序首次登录界面
        if (e.detail.userInfo) {
            wx.getUserInfo({
                success: function(res){
                    var nickname=res.userInfo.nickName;
                    var profile=res.userInfo.avatarUrl;
                    //设置昵称和头像
                    that.setData({
                        nickname_cur: nickname,
                        profile_cur: profile
                    })
                    //已经有了数据,只需要授权,不需要插入数据以及观看开屏动画
                    if(that.data.is_havedata){
                        //数据需要更新
                        if(that.isNeedUpdate()){
                            // console.log("yes")
                            that.UpdateUserData();
                        }
                        wx.switchTab({
                            url: '../../homePage/homePage',
                        })
                    }
                    else{
                        //插入数据后进入到开屏动画
                        that.InsertUserData();
                        wx.redirectTo({
                            url: '../prePage1/prePage1'
                        })
                    }
                }
            })
        } else {
            //用户按了拒绝按钮
            wx.showModal({
                title:'警告',
                content:'您点击了拒绝授权，将无法进入小程序，请授权之后再进入!!!',
                showCancel:false,
                confirmText:'返回授权',
                success:function(res){
                    if (res.confirm) {
                        console.log('用户点击了“返回授权”')
                    } 
                }
            })
        }
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
            openid: "oBuvP4oi2qNtBtvpZf2c5-EGMR3c"
          }).get({
            success: (res) => {
                //找到了对应的id
                if(res.data.length>0){
                    //获得数据库中存着的昵称和头像
                    that.setData({
                        nickname_db: res.data[0].nickname,
                        profile_db: res.data[0].profile
                    })
                    //有授权
                    if(!that.data.need_authority){
                        //数据需要更新
                        if(that.isNeedUpdate())
                            that.UpdateUserData();
                            wx.switchTab({
                                url: '../../homePage/homePage',
                            })                   
                    }
                    //没授权
                    if(that.data.need_authority){
                        that.setData({
                            is_havedata: true
                        })
                    }
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
        wx.getUserInfo({
            success: function(res){
                var nickname=res.userInfo.nickName;
                var profile=res.userInfo.avatarUrl;
                //设置昵称和头像
                that.setData({
                    nickname: nickname,
                    profile: profile
                })
            }
        })
        db.collection('useradata').where({
            openid: that.data.openid
          }).update({
            profile: that.data.profile_cur,
            nickname: that.data.nickname_cur
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