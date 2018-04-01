//app.js

//************************ load bmob **********************/
var Bmob = require('utils/bmob.js')
// var BmobSocketIo = require('utils/bmobSocketIo.js').BmobSocketIo;
// const BmobSocketIo = require('utils/tunnel');
Bmob.initialize(
  '582ae600f1735db936dabf2cf6efb57f',
  'f5230f2cc071d4b0f0defa8106c03d47'
)
//************************ load bmob end **********************/

App({

  onLaunch: function () {
    // var user = new Bmob.User() //开始注册用户
    // user.auth()

    //调用API从本地缓存中获取数据
    try {
      var value = wx.getStorageSync('user_openid')
      if (value) {
      } else {
        wx.login({
          success: function (res) {
            if (res.code) {
              console.log('获取用户登录成功！')
              // bmob 登录
              bmobLogin(res.code)
            } else {
              console.log('获取用户登录态失败！' + res.errMsg)
            }
          }
        })
      }
    } catch (e) {
      console.log("登陆失败")
    }
    wx.checkSession({
      success: function () {
      },
      fail: function () {
        //登录态过期，重新登录
        wx.login()
      }
    })

    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
  },

  globalData: {
    userInfo: null
  }

})

/**
 * bmob login 
 */
function bmobLogin(resCode){
  Bmob.User.requestOpenId(resCode, {
    success: function (userData) {
      console.log("success")

      wx.getUserInfo({
        success: function (result) {
          var userInfo = result.userInfo
          var nickName = userInfo.nickName
          var avatarUrl = userInfo.avatarUrl
          var sex = userInfo.gender
          Bmob.User.logIn(nickName, userData.openid, {
            success: function (user) {
              try {
                wx.setStorageSync('user_openid', user.get('userData').openid)
                wx.setStorageSync('user_id', user.id)
                wx.setStorageSync('my_nick', user.get("nickname"))
                wx.setStorageSync('my_username', user.get("username"))
                wx.setStorageSync('my_sex', user.get("sex"))
                wx.setStorageSync('my_avatar', user.get("userPic"))
              } catch (e) {
              }
              console.log("登录成功");
            },
            error: function (user, error) {
              if (error.code == '101') {
                var user = new Bmob.User();//开始注册用户
                user.set('username', nickName);
                user.set('password', userData.openid);
                user.set("nickname", nickName);
                user.set("userPic", avatarUrl);
                user.set("userData", userData);
                user.set('sex', sex);
                user.set('feednum', 0);
                user.signUp(null, {
                  success: function (result) {
                    console.log('注册成功');
                    try {//将返回的3rd_session存储到缓存中
                      wx.setStorageSync('user_openid', user.get('userData').openid)
                      wx.setStorageSync('user_id', user.id)
                      wx.setStorageSync('my_nick', user.get("nickname"))
                      wx.setStorageSync('my_username', user.get("username"))
                      wx.setStorageSync('my_sex', user.get("sex"))
                      wx.setStorageSync('my_avatar', user.get("userPic"))
                    } catch (e) {
                    }
                  },
                  error: function (userData, error) {
                    console.log("openid=" + userData);
                    console.log(error)
                  }
                });

              }
            }
          });
        }
      })
    },
    error: function (error) {
      console.log("error:" + error.code + " " + error.message)
    }
  })
}